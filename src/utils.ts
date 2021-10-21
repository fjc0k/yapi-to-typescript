import JSON5 from 'json5'
import Mock from 'mockjs'
import path from 'path'
import prettier from 'prettier'
import toJsonSchema from 'to-json-schema'
import {
  castArray,
  forOwn,
  isArray,
  isEmpty,
  isObject,
  mapKeys,
  memoize,
  omit,
  run,
} from 'vtils'
import { compile, Options } from 'json-schema-to-typescript'
import { Defined, OneOrMore } from 'vtils/types'
import { FileData } from './helpers'
import {
  Interface,
  Method,
  PropDefinition,
  PropDefinitions,
  RequestBodyType,
  RequestFormItemType,
  Required,
  ResponseBodyType,
} from './types'
import { JSONSchema4, JSONSchema4TypeName } from 'json-schema'

/**
 * 抛出错误。
 *
 * @param msg 错误信息
 */
export function throwError(...msg: string[]): never {
  /* istanbul ignore next */
  throw new Error(msg.join(''))
}

/**
 * 将路径统一为 unix 风格的路径。
 *
 * @param path 路径
 * @returns unix 风格的路径
 */
export function toUnixPath(path: string) {
  return path.replace(/[/\\]+/g, '/')
}

/**
 * 获得规范化的相对路径。
 *
 * @param from 来源路径
 * @param to 去向路径
 * @returns 相对路径
 */
export function getNormalizedRelativePath(from: string, to: string) {
  return toUnixPath(path.relative(path.dirname(from), to))
    .replace(/^(?=[^.])/, './')
    .replace(/\.(ts|js)x?$/i, '')
}

/**
 * 原地处理 JSONSchema。
 *
 * @param jsonSchema 待处理的 JSONSchema
 * @returns 处理后的 JSONSchema
 */
export function processJsonSchema<T extends JSONSchema4>(
  jsonSchema: T,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
): T {
  /* istanbul ignore if */
  if (!isObject(jsonSchema)) return jsonSchema

  // 去除 title 和 id，防止 json-schema-to-typescript 提取它们作为接口名
  delete jsonSchema.title
  delete jsonSchema.id

  // 忽略数组长度限制
  delete jsonSchema.minItems
  delete jsonSchema.maxItems

  if (jsonSchema.type === 'object') {
    // 将 additionalProperties 设为 false
    jsonSchema.additionalProperties = false
  }

  // 删除通过 swagger 导入时未剔除的 ref
  delete jsonSchema.$ref
  delete jsonSchema.$$ref

  // 删除 default，防止 json-schema-to-typescript 根据它推测类型
  delete jsonSchema.default

  // 处理类型名称为标准的 JSONSchema 类型名称
  if (jsonSchema.type) {
    // 类型映射表，键都为小写
    const typeMapping: Record<string, JSONSchema4TypeName> = {
      byte: 'integer',
      short: 'integer',
      int: 'integer',
      long: 'integer',
      float: 'number',
      double: 'number',
      bigdecimal: 'number',
      char: 'string',
      void: 'null',
      ...mapKeys(customTypeMapping, (_, key) => key.toLowerCase()),
    }
    const isMultiple = Array.isArray(jsonSchema.type)
    const types = castArray(jsonSchema.type).map(type => {
      // 所有类型转成小写，如：String -> string
      type = type.toLowerCase() as any
      // 映射为标准的 JSONSchema 类型
      type = typeMapping[type] || type
      return type
    })
    jsonSchema.type = isMultiple ? types : types[0]
  }

  // Mock.toJSONSchema 产生的 properties 为数组，然而 JSONSchema4 的 properties 为对象
  if (isArray(jsonSchema.properties)) {
    jsonSchema.properties = (jsonSchema.properties as JSONSchema4[]).reduce<
      Defined<JSONSchema4['properties']>
    >((props, js) => {
      props[js.name] = js
      return props
    }, {})
  }

  // 移除字段名称首尾空格
  if (jsonSchema.properties) {
    forOwn(jsonSchema.properties, (_, prop) => {
      const propDef = jsonSchema.properties![prop]
      delete jsonSchema.properties![prop]
      jsonSchema.properties![(prop as string).trim()] = propDef
    })
    jsonSchema.required =
      jsonSchema.required && jsonSchema.required.map(prop => prop.trim())
  }

  // 继续处理对象的子元素
  if (jsonSchema.properties) {
    forOwn(jsonSchema.properties, item =>
      processJsonSchema(item, customTypeMapping),
    )
  }

  // 继续处理数组的子元素
  if (jsonSchema.items) {
    castArray(jsonSchema.items).forEach(item =>
      processJsonSchema(item, customTypeMapping),
    )
  }

  // 处理 oneOf
  if (jsonSchema.oneOf) {
    jsonSchema.oneOf.forEach(item => processJsonSchema(item, customTypeMapping))
  }

  // 处理 anyOf
  if (jsonSchema.anyOf) {
    jsonSchema.anyOf.forEach(item => processJsonSchema(item, customTypeMapping))
  }

  // 处理 allOf
  if (jsonSchema.allOf) {
    jsonSchema.allOf.forEach(item => processJsonSchema(item, customTypeMapping))
  }

  return jsonSchema
}

/**
 * 将 JSONSchema 字符串转为 JSONSchema 对象。
 *
 * @param str 要转换的 JSONSchema 字符串
 * @returns 转换后的 JSONSchema 对象
 */
export function jsonSchemaStringToJsonSchema(
  str: string,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
): JSONSchema4 {
  return processJsonSchema(JSON.parse(str), customTypeMapping)
}

/**
 * 获得 JSON 数据的 JSONSchema 对象。
 *
 * @param json JSON 数据
 * @returns JSONSchema 对象
 */
export function jsonToJsonSchema(
  json: object,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
): JSONSchema4 {
  const schema = toJsonSchema(json, {
    required: false,
    arrays: {
      mode: 'first',
    },
    objects: {
      additionalProperties: false,
    },
    strings: {
      detectFormat: false,
    },
    postProcessFnc: (type, schema, value) => {
      if (!schema.description && !!value && type !== 'object') {
        schema.description = JSON.stringify(value)
      }
      return schema
    },
  })
  delete schema.description
  return processJsonSchema(schema as any, customTypeMapping)
}

/**
 * 获得 mockjs 模板的 JSONSchema 对象。
 *
 * @param template mockjs 模板
 * @returns JSONSchema 对象
 */
export function mockjsTemplateToJsonSchema(
  template: object,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
): JSONSchema4 {
  return processJsonSchema(
    Mock.toJSONSchema(template) as any,
    customTypeMapping,
  )
}

/**
 * 获得属性定义列表的 JSONSchema 对象。
 *
 * @param propDefinitions 属性定义列表
 * @returns JSONSchema 对象
 */
export function propDefinitionsToJsonSchema(
  propDefinitions: PropDefinitions,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
): JSONSchema4 {
  return processJsonSchema(
    {
      type: 'object',
      required: propDefinitions.reduce<string[]>((res, prop) => {
        if (prop.required) {
          res.push(prop.name)
        }
        return res
      }, []),
      properties: propDefinitions.reduce<
        Exclude<JSONSchema4['properties'], undefined>
      >((res, prop) => {
        res[prop.name] = {
          type: prop.type,
          description: prop.comment,
          ...(prop.type === ('file' as any) ? { tsType: FileData.name } : {}),
        }
        return res
      }, {}),
    },
    customTypeMapping,
  )
}

const JSTTOptions: Partial<Options> = {
  bannerComment: '',
  style: {
    bracketSpacing: false,
    printWidth: 120,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
  },
}

/**
 * 根据 JSONSchema 对象生产 TypeScript 类型定义。
 *
 * @param jsonSchema JSONSchema 对象
 * @param typeName 类型名称
 * @returns TypeScript 类型定义
 */
export async function jsonSchemaToType(
  jsonSchema: JSONSchema4,
  typeName: string,
): Promise<string> {
  if (isEmpty(jsonSchema)) {
    return `export interface ${typeName} {}`
  }
  if (jsonSchema.__is_any__) {
    delete jsonSchema.__is_any__
    return `export type ${typeName} = any`
  }
  // JSTT 会转换 typeName，因此传入一个全大写的假 typeName，生成代码后再替换回真正的 typeName
  const fakeTypeName = 'THISISAFAKETYPENAME'
  const code = await compile(
    // 去除最外层的 description 以防止 JSTT 提取它作为类型的注释
    omit(jsonSchema, ['description']),
    fakeTypeName,
    JSTTOptions,
  )
  delete jsonSchema.id
  return code.replace(fakeTypeName, typeName).trim()
}

export function getRequestDataJsonSchema(
  interfaceInfo: Interface,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
): JSONSchema4 {
  let jsonSchema!: JSONSchema4

  // 处理表单数据（仅 POST 类接口）
  if (isPostLikeMethod(interfaceInfo.method)) {
    switch (interfaceInfo.req_body_type) {
      case RequestBodyType.form:
        jsonSchema = propDefinitionsToJsonSchema(
          interfaceInfo.req_body_form.map<PropDefinition>(item => ({
            name: item.name,
            required: item.required === Required.true,
            type: (item.type === RequestFormItemType.file
              ? 'file'
              : 'string') as any,
            comment: item.desc,
          })),
          customTypeMapping,
        )
        break
      case RequestBodyType.json:
        if (interfaceInfo.req_body_other) {
          jsonSchema = interfaceInfo.req_body_is_json_schema
            ? jsonSchemaStringToJsonSchema(
                interfaceInfo.req_body_other,
                customTypeMapping,
              )
            : jsonToJsonSchema(
                JSON5.parse(interfaceInfo.req_body_other),
                customTypeMapping,
              )
        }
        break
      default:
        /* istanbul ignore next */
        break
    }
  }

  // 处理查询数据
  if (isArray(interfaceInfo.req_query) && interfaceInfo.req_query.length) {
    const queryJsonSchema = propDefinitionsToJsonSchema(
      interfaceInfo.req_query.map<PropDefinition>(item => ({
        name: item.name,
        required: item.required === Required.true,
        type: item.type || 'string',
        comment: item.desc,
      })),
      customTypeMapping,
    )
    /* istanbul ignore else */
    if (jsonSchema) {
      jsonSchema.properties = {
        ...jsonSchema.properties,
        ...queryJsonSchema.properties,
      }
      jsonSchema.required = [
        ...(jsonSchema.required || []),
        ...(queryJsonSchema.required || []),
      ]
    } else {
      jsonSchema = queryJsonSchema
    }
  }

  // 处理路径参数
  if (isArray(interfaceInfo.req_params) && interfaceInfo.req_params.length) {
    const paramsJsonSchema = propDefinitionsToJsonSchema(
      interfaceInfo.req_params.map<PropDefinition>(item => ({
        name: item.name,
        required: true,
        type: item.type || 'string',
        comment: item.desc,
      })),
      customTypeMapping,
    )
    /* istanbul ignore else */
    if (jsonSchema) {
      jsonSchema.properties = {
        ...jsonSchema.properties,
        ...paramsJsonSchema.properties,
      }
      jsonSchema.required = [
        ...(jsonSchema.required || []),
        ...(paramsJsonSchema.required || []),
      ]
    } else {
      jsonSchema = paramsJsonSchema
    }
  }

  return jsonSchema
}

export function getResponseDataJsonSchema(
  interfaceInfo: Interface,
  customTypeMapping: Record<string, JSONSchema4TypeName>,
  dataKey?: OneOrMore<string>,
): JSONSchema4 {
  let jsonSchema: JSONSchema4 = {}

  switch (interfaceInfo.res_body_type) {
    case ResponseBodyType.json:
      if (interfaceInfo.res_body) {
        jsonSchema = interfaceInfo.res_body_is_json_schema
          ? jsonSchemaStringToJsonSchema(
              interfaceInfo.res_body,
              customTypeMapping,
            )
          : mockjsTemplateToJsonSchema(
              JSON5.parse(interfaceInfo.res_body),
              customTypeMapping,
            )
      }
      break
    default:
      jsonSchema = { __is_any__: true }
      break
  }

  if (dataKey && jsonSchema) {
    jsonSchema = reachJsonSchema(jsonSchema, dataKey)
  }

  return jsonSchema
}

export function reachJsonSchema(
  jsonSchema: JSONSchema4,
  path: OneOrMore<string>,
) {
  let last = jsonSchema
  for (const segment of castArray(path)) {
    const _last = last.properties?.[segment]
    if (!_last) {
      return jsonSchema
    }
    last = _last
  }
  return last
}

export function sortByWeights<T extends { weights: number[] }>(list: T[]): T[] {
  list.sort((a, b) => {
    const x = a.weights.length > b.weights.length ? b : a
    const minLen = Math.min(a.weights.length, b.weights.length)
    const maxLen = Math.max(a.weights.length, b.weights.length)
    x.weights.push(...new Array(maxLen - minLen).fill(0))
    const w = a.weights.reduce((w, _, i) => {
      if (w === 0) {
        w = a.weights[i] - b.weights[i]
      }
      return w
    }, 0)
    return w
  })
  return list
}

export function isGetLikeMethod(method: Method): boolean {
  return (
    method === Method.GET || method === Method.OPTIONS || method === Method.HEAD
  )
}

export function isPostLikeMethod(method: Method): boolean {
  return !isGetLikeMethod(method)
}

export async function getPrettierOptions(): Promise<prettier.Options> {
  const prettierOptions: prettier.Options = {
    parser: 'typescript',
    printWidth: 120,
    tabWidth: 2,
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    bracketSpacing: false,
    endOfLine: 'lf',
  }

  // 测试时跳过本地配置的解析
  if (process.env.JEST_WORKER_ID) {
    return prettierOptions
  }

  const [prettierConfigPathErr, prettierConfigPath] = await run(() =>
    prettier.resolveConfigFile(),
  )
  if (prettierConfigPathErr || !prettierConfigPath) {
    return prettierOptions
  }

  const [prettierConfigErr, prettierConfig] = await run(() =>
    prettier.resolveConfig(prettierConfigPath),
  )
  if (prettierConfigErr || !prettierConfig) {
    return prettierOptions
  }

  Object.assign(prettierOptions, prettierConfig)

  return prettierOptions
}

export const getCachedPrettierOptions = memoize(getPrettierOptions)
