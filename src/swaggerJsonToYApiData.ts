// @ts-nocheck
// ref: https://github.com/YMFE/yapi/blob/master/exts/yapi-plugin-import-swagger/run.js

import dayjs from 'dayjs'
import swagger from 'swagger-client'
import { Category, Interface, Project } from './types'
import { each, find } from 'vtils'
import { OpenAPIV2 as SwaggerType } from 'openapi-types'

let SwaggerData, isOAS3

function handlePath(path) {
  if (path === '/') return path
  if (path.charAt(0) !== '/') {
    path = `/${path}`
  }
  if (path.charAt(path.length - 1) === '/') {
    path = path.substr(0, path.length - 1)
  }
  return path
}

function openapi2swagger(data) {
  data.swagger = '2.0'
  each(data.paths, apis => {
    each(apis, api => {
      each(api.responses, res => {
        if (
          res.content &&
          res.content['application/json'] &&
          typeof res.content['application/json'] === 'object'
        ) {
          Object.assign(res, res.content['application/json'])
          delete res.content
        }
        if (
          res.content &&
          res.content['application/hal+json'] &&
          typeof res.content['application/hal+json'] === 'object'
        ) {
          Object.assign(res, res.content['application/hal+json'])
          delete res.content
        }
        if (
          res.content &&
          res.content['*/*'] &&
          typeof res.content['*/*'] === 'object'
        ) {
          Object.assign(res, res.content['*/*'])
          delete res.content
        }
      })
      if (api.requestBody) {
        if (!api.parameters) api.parameters = []
        const body = {
          type: 'object',
          name: 'body',
          in: 'body',
        }
        try {
          body.schema = api.requestBody.content['application/json'].schema
        } catch (e) {
          body.schema = {}
        }

        api.parameters.push(body)
      }
    })
  })

  return data
}

async function handleSwaggerData(res) {
  return new Promise(resolve => {
    const data = swagger({
      spec: res,
    })

    data.then(res => {
      resolve(res.spec)
    })
  })
}

async function run(
  res,
): {
  apis: Interface[]
  cats: Category[]
  basePath: string
  swaggerData: SwaggerType.Document
} {
  const interfaceData = { apis: [], cats: [], basePath: '', swaggerData: {} }
  if (typeof res === 'string' && res) {
    try {
      res = JSON.parse(res)
    } catch (e) {
      console.error('json 解析出错', e.message)
    }
  }

  isOAS3 = res.openapi && String(res.openapi).startsWith('3.')
  if (isOAS3) {
    res = openapi2swagger(res)
  }
  res = await handleSwaggerData(res)
  SwaggerData = res
  interfaceData.swaggerData = SwaggerData

  interfaceData.basePath = res.basePath || ''

  if (res.tags && Array.isArray(res.tags)) {
    res.tags.forEach(tag => {
      interfaceData.cats.push({
        name: tag.name,
        desc: tag.description,
      })
    })
  } else {
    res.tags = []
  }

  each(res.paths, (apis, path) => {
    // parameters is common parameters, not a method
    delete apis.parameters
    each(apis, (api, method) => {
      api.path = path
      api.method = method
      let data = null
      try {
        data = handleSwagger(api, res.tags)
        if (data.catname) {
          if (!find(interfaceData.cats, item => item.name === data.catname)) {
            if (res.tags.length === 0) {
              interfaceData.cats.push({
                name: data.catname,
                desc: data.catname,
              })
            }
          }
        }
      } catch (err) {
        data = null
      }
      if (data) {
        interfaceData.apis.push(data)
      }
    })
  })

  interfaceData.cats = interfaceData.cats.filter(catData => {
    const catName = catData.name
    return find(interfaceData.apis, apiData => {
      return apiData.catname === catName
    })
  })

  return interfaceData
}

function handleSwagger(data, originTags = []) {
  const api = {}
  //处理基本信息
  api.method = data.method.toUpperCase()
  api.title = data.summary || data.path
  api.desc = data.description
  api.catname = null
  if (data.tags && Array.isArray(data.tags)) {
    api.tag = data.tags
    for (let i = 0; i < data.tags.length; i++) {
      if (/v[0-9.]+/.test(data.tags[i])) {
        continue
      }

      // 如果根路径有 tags，使用根路径 tags,不使用每个接口定义的 tag 做完分类
      if (
        originTags.length > 0 &&
        find(originTags, item => {
          return item.name === data.tags[i]
        })
      ) {
        api.catname = data.tags[i]
        break
      }

      if (originTags.length === 0) {
        api.catname = data.tags[i]
        break
      }
    }
  }

  api.path = handlePath(data.path)
  api.req_params = []
  api.req_body_form = []
  api.req_headers = []
  api.req_query = []
  api.req_body_type = 'raw'
  api.res_body_type = 'raw'

  if (data.produces && data.produces.indexOf('application/json') > -1) {
    api.res_body_type = 'json'
    api.res_body_is_json_schema = true
  }

  if (data.consumes && Array.isArray(data.consumes)) {
    if (
      data.consumes.indexOf('application/x-www-form-urlencoded') > -1 ||
      data.consumes.indexOf('multipart/form-data') > -1
    ) {
      api.req_body_type = 'form'
    } else if (data.consumes.indexOf('application/json') > -1) {
      api.req_body_type = 'json'
      api.req_body_is_json_schema = true
    }
  }

  //处理response
  api.res_body = handleResponse(data.responses)
  try {
    JSON.parse(api.res_body)
    api.res_body_type = 'json'
    api.res_body_is_json_schema = true
  } catch (e) {
    api.res_body_type = 'raw'
  }
  //处理参数
  function simpleJsonPathParse(key, json) {
    if (
      !key ||
      typeof key !== 'string' ||
      key.indexOf('#/') !== 0 ||
      key.length <= 2
    ) {
      return null
    }
    let keys = key.substr(2).split('/')
    keys = keys.filter(item => {
      return item
    })
    for (let i = 0, l = keys.length; i < l; i++) {
      try {
        json = json[keys[i]]
      } catch (e) {
        json = ''
        break
      }
    }
    return json
  }

  if (data.parameters && Array.isArray(data.parameters)) {
    data.parameters.forEach(param => {
      if (param && typeof param === 'object' && param.$ref) {
        param = simpleJsonPathParse(param.$ref, {
          parameters: SwaggerData.parameters,
        })
      }
      const defaultParam = {
        name: param.name,
        desc: param.description,
        required: param.required ? '1' : '0',
      }

      if (param.in) {
        switch (param.in) {
          case 'path':
            api.req_params.push(defaultParam)
            break
          case 'query':
            api.req_query.push(defaultParam)
            break
          case 'body':
            handleBodyPamras(param.schema, api)
            break
          case 'formData':
            defaultParam.type = param.type === 'file' ? 'file' : 'text'
            if (param.example) {
              defaultParam.example = param.example
            }
            api.req_body_form.push(defaultParam)
            break
          case 'header':
            api.req_headers.push(defaultParam)
            break
          default:
            break
        }
      } else {
        api.req_query.push(defaultParam)
      }
    })
  }

  return api
}

function isJson(json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return false
  }
}

function handleBodyPamras(data, api) {
  api.req_body_other = JSON.stringify(data, null, 2)
  if (isJson(api.req_body_other)) {
    api.req_body_type = 'json'
    api.req_body_is_json_schema = true
  }
}

function handleResponse(api) {
  let res_body = ''
  if (!api || typeof api !== 'object') {
    return res_body
  }
  const codes = Object.keys(api)
  let curCode
  if (codes.length > 0) {
    if (codes.indexOf('200') > -1) {
      curCode = '200'
    } else curCode = codes[0]

    const res = api[curCode]
    if (res && typeof res === 'object') {
      if (res.schema) {
        res_body = JSON.stringify(res.schema, null, 2)
      } else if (res.description) {
        res_body = res.description
      }
    } else if (typeof res === 'string') {
      res_body = res
    } else {
      res_body = ''
    }
  } else {
    res_body = ''
  }
  return res_body
}

export async function swaggerJsonToYApiData(
  data: any,
): Promise<{
  project: Project
  cats: Category[]
  interfaces: Interface[]
}> {
  const yapiData = await run(data)

  // 兼容没有分类的情况
  if (!yapiData.cats.length) {
    yapiData.cats = [
      {
        name: 'default',
        desc: 'default',
      },
    ]
    yapiData.apis.forEach(api => {
      api.catname = 'default'
    })
  }

  const currentTime = dayjs().unix()
  const project: Project = {
    _id: 0,
    name: yapiData.swaggerData.info.title,
    desc: yapiData.swaggerData.info.description || '',
    basepath: yapiData.swaggerData.basePath || '',
    tag: [],
    env: [
      {
        name: 'local',
        domain: `${yapiData.swaggerData.schemes?.[0] || 'http'}://${yapiData
          .swaggerData.host || '127.0.0.1'}`,
      },
    ],
  }
  const cats = yapiData.cats.map<Category>((cat, index) => ({
    _id: index + 1,
    name: cat.name,
    desc: cat.desc,
    add_time: currentTime,
    up_time: currentTime,
  }))
  const interfaces = yapiData.apis.map<Interface>((api, index) => ({
    ...api,
    _id: index + 1,
    project_id: 0,
    catid: cats.find(cat => cat.name === api.catname)?._id || -1,
    tag: api.tag || [],
    add_time: currentTime,
    up_time: currentTime,
  }))

  return { project, cats, interfaces }
}
