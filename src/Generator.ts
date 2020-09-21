import * as changeCase from 'change-case'
import dayjs from 'dayjs'
import fs from 'fs-extra'
import got from 'got'
import JSON5 from 'json5'
import path from 'path'
import prettier from 'prettier'
import {
  castArray,
  dedent,
  groupBy,
  isArray,
  isEmpty,
  isFunction,
  memoize,
  noop,
  omit,
  uniq,
  values,
} from 'vtils'
import {
  CategoryList,
  Config,
  ExtendedInterface,
  Interface,
  InterfaceList,
  Method,
  Project,
  ProjectConfig,
  PropDefinition,
  RequestBodyType,
  RequestFormItemType,
  Required,
  ResponseBodyType,
  ServerConfig,
  SyntheticalConfig,
} from './types'
import { exec } from 'child_process'
import {
  getNormalizedRelativePath,
  jsonSchemaStringToJsonSchema,
  jsonSchemaToType,
  jsonToJsonSchema,
  mockjsTemplateToJsonSchema,
  propDefinitionsToJsonSchema,
  throwError,
} from './utils'
import { JSONSchema4 } from 'json-schema'

interface OutputFileList {
  [outputFilePath: string]: {
    syntheticalConfig: SyntheticalConfig
    content: string[]
    requestFunctionFilePath: string
    requestHookMakerFilePath: string
  }
}

export class Generator {
  /** 配置 */
  private config: ServerConfig[] = []

  constructor(
    config: Config,
    private options: { cwd: string } = { cwd: process.cwd() },
  ) {
    this.config =
      // config 可能是对象或数组，统一为数组
      castArray(config).map(item => {
        if (item.serverUrl) {
          // 去除地址后面的 /
          // fix: https://github.com/fjc0k/yapi-to-typescript/issues/22
          item.serverUrl = item.serverUrl.replace(/\/+$/, '')
        }
        return item
      })
  }

  async generate(): Promise<OutputFileList> {
    const outputFileList: OutputFileList = Object.create(null)

    await Promise.all(
      this.config.map(async (serverConfig, serverIndex) => {
        const projects = serverConfig.projects.reduce<ProjectConfig[]>(
          (projects, project) => {
            projects.push(
              ...castArray(project.token).map(token => ({
                ...project,
                token: token,
              })),
            )
            return projects
          },
          [],
        )
        return Promise.all(
          projects.map(async (projectConfig, projectIndex) => {
            const projectInfo = await this.fetchProjectInfo({
              ...serverConfig,
              ...projectConfig,
            })
            await Promise.all(
              projectConfig.categories.map(
                async (categoryConfig, categoryIndex) => {
                  // 分类处理
                  // 数组化
                  let categoryIds = castArray(categoryConfig.id)
                  // 全部分类
                  if (categoryIds.includes(0)) {
                    categoryIds.push(...projectInfo.cats.map(cat => cat._id))
                  }
                  // 唯一化
                  categoryIds = uniq(categoryIds)
                  // 去掉被排除的分类
                  const excludedCategoryIds = categoryIds
                    .filter(id => id < 0)
                    .map(Math.abs)
                  categoryIds = categoryIds.filter(
                    id => !excludedCategoryIds.includes(Math.abs(id)),
                  )
                  // 删除不存在的分类
                  categoryIds = categoryIds.filter(
                    id => !!projectInfo.cats.find(cat => cat._id === id),
                  )
                  // 顺序化
                  categoryIds = categoryIds.sort()

                  const codes = await Promise.all(
                    categoryIds.map<
                      Promise<{
                        outputFilePath: string
                        code: string
                        weights: number[]
                      }>
                    >(async (id, categoryIndex2) => {
                      categoryConfig = {
                        ...categoryConfig,
                        id: id,
                      }
                      const syntheticalConfig: SyntheticalConfig = {
                        ...serverConfig,
                        ...projectConfig,
                        ...categoryConfig,
                        mockUrl: projectInfo.getMockUrl(),
                      }
                      syntheticalConfig.target =
                        syntheticalConfig.target || 'typescript'
                      syntheticalConfig.devUrl = projectInfo.getDevUrl(
                        syntheticalConfig.devEnvName!,
                      )
                      syntheticalConfig.prodUrl = projectInfo.getProdUrl(
                        syntheticalConfig.prodEnvName!,
                      )
                      const interfaceList = (
                        await this.fetchInterfaceList(syntheticalConfig)
                      ).sort((a, b) => a._id - b._id)
                      const outputFilePath = path.resolve(
                        this.options.cwd,
                        syntheticalConfig.outputFilePath!,
                      )
                      const categoryUID = `_${serverIndex}_${projectIndex}_${categoryIndex}_${categoryIndex2}`
                      const categoryCode =
                        interfaceList.length === 0
                          ? ''
                          : [
                              syntheticalConfig.typesOnly
                                ? ''
                                : dedent`
                                  const mockUrl${categoryUID} = ${JSON.stringify(
                                    syntheticalConfig.mockUrl,
                                  )} as any
                                  const devUrl${categoryUID} = ${JSON.stringify(
                                    syntheticalConfig.devUrl,
                                  )} as any
                                  const prodUrl${categoryUID} = ${JSON.stringify(
                                    syntheticalConfig.prodUrl,
                                  )} as any
                                  const dataKey${categoryUID} = ${JSON.stringify(
                                    syntheticalConfig.dataKey,
                                  )} as any
                                `,
                              ...(await Promise.all(
                                interfaceList.map(async interfaceInfo => {
                                  interfaceInfo = isFunction(
                                    syntheticalConfig.preproccessInterface,
                                  )
                                    ? syntheticalConfig.preproccessInterface(
                                        interfaceInfo,
                                        changeCase,
                                      )
                                    : interfaceInfo
                                  return this.generateInterfaceCode(
                                    syntheticalConfig,
                                    interfaceInfo,
                                    categoryUID,
                                  )
                                }),
                              )),
                            ].join('\n\n')
                      if (!outputFileList[outputFilePath]) {
                        outputFileList[outputFilePath] = {
                          syntheticalConfig,
                          content: [],
                          requestFunctionFilePath: syntheticalConfig.requestFunctionFilePath
                            ? path.resolve(
                                this.options.cwd,
                                syntheticalConfig.requestFunctionFilePath,
                              )
                            : path.join(
                                path.dirname(outputFilePath),
                                'request.ts',
                              ),
                          requestHookMakerFilePath:
                            syntheticalConfig.reactHooks &&
                            syntheticalConfig.reactHooks.enabled
                              ? syntheticalConfig.reactHooks
                                  .requestHookMakerFilePath
                                ? path.resolve(
                                    this.options.cwd,
                                    syntheticalConfig.reactHooks
                                      .requestHookMakerFilePath,
                                  )
                                : path.join(
                                    path.dirname(outputFilePath),
                                    'makeRequestHook.ts',
                                  )
                              : '',
                        }
                      }
                      return {
                        outputFilePath: outputFilePath,
                        code: categoryCode,
                        weights: [
                          serverIndex,
                          projectIndex,
                          categoryIndex,
                          categoryIndex2,
                        ],
                      }
                    }),
                  )
                  for (const groupedCodes of values(
                    groupBy(codes, item => item.outputFilePath),
                  )) {
                    groupedCodes.sort((a, b) => {
                      const x = a.weights.length > b.weights.length ? b : a
                      const minLen = Math.min(
                        a.weights.length,
                        b.weights.length,
                      )
                      const maxLen = Math.max(
                        a.weights.length,
                        b.weights.length,
                      )
                      x.weights.push(...new Array(maxLen - minLen).fill(0))
                      const w = a.weights.reduce((w, _, i) => {
                        if (w === 0) {
                          w = a.weights[i] - b.weights[i]
                        }
                        return w
                      }, 0)
                      return w
                    })
                    outputFileList[groupedCodes[0].outputFilePath].content.push(
                      ...groupedCodes.map(item => item.code),
                    )
                  }
                },
              ),
            )
          }),
        )
      }),
    )

    return outputFileList
  }

  async write(outputFileList: OutputFileList) {
    return Promise.all(
      Object.keys(outputFileList).map(async outputFilePath => {
        let {
          // eslint-disable-next-line prefer-const
          content,
          requestFunctionFilePath,
          requestHookMakerFilePath,
          // eslint-disable-next-line prefer-const
          syntheticalConfig,
        } = outputFileList[outputFilePath]

        const rawRequestFunctionFilePath = requestFunctionFilePath
        const rawRequestHookMakerFilePath = requestHookMakerFilePath

        // 支持 .jsx? 后缀
        outputFilePath = outputFilePath.replace(/\.js(x)?$/, '.ts$1')
        requestFunctionFilePath = requestFunctionFilePath.replace(
          /\.js(x)?$/,
          '.ts$1',
        )
        requestHookMakerFilePath = requestHookMakerFilePath.replace(
          /\.js(x)?$/,
          '.ts$1',
        )

        if (!syntheticalConfig.typesOnly) {
          if (!(await fs.pathExists(rawRequestFunctionFilePath))) {
            await fs.outputFile(
              requestFunctionFilePath,
              dedent`
                import { RequestFunctionParams } from 'yapi-to-typescript'

                export interface RequestOptions {
                  /**
                   * 使用的服务器。
                   *
                   * - \`prod\`: 生产服务器
                   * - \`dev\`: 测试服务器
                   * - \`mock\`: 模拟服务器
                   *
                   * @default prod
                   */
                  server?: 'prod' | 'dev' | 'mock',
                }

                export default function request<TResponseData>(
                  payload: RequestFunctionParams,
                  options: RequestOptions = {
                    server: 'prod',
                  },
                ): Promise<TResponseData> {
                  return new Promise<TResponseData>((resolve, reject) => {
                    // 基本地址
                    const baseUrl = options.server === 'mock'
                      ? payload.mockUrl
                      : options.server === 'dev'
                        ? payload.devUrl
                        : payload.prodUrl

                    // 请求地址
                    const url = \`\${baseUrl}\${payload.path}\`

                    // 具体请求逻辑
                  })
                }
              `,
            )
          }
          if (
            syntheticalConfig.reactHooks &&
            syntheticalConfig.reactHooks.enabled &&
            !(await fs.pathExists(rawRequestHookMakerFilePath))
          ) {
            await fs.outputFile(
              requestHookMakerFilePath,
              dedent`
                import { useState, useEffect } from 'react'
                import { RequestConfig } from 'yapi-to-typescript'
                import { Request } from ${JSON.stringify(
                  getNormalizedRelativePath(
                    requestHookMakerFilePath,
                    outputFilePath,
                  ),
                )}
                import baseRequest from ${JSON.stringify(
                  getNormalizedRelativePath(
                    requestHookMakerFilePath,
                    requestFunctionFilePath,
                  ),
                )}

                export default function makeRequestHook<TRequestData, TRequestConfig extends RequestConfig, TRequestResult extends ReturnType<typeof baseRequest>>(request: Request<TRequestData, TRequestConfig, TRequestResult>) {
                  type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult
                  return function useRequest(requestData: TRequestData) {
                    // 一个简单的 Hook 实现，实际项目可结合其他库使用，比如：
                    // @umijs/hooks 的 useRequest (https://github.com/umijs/hooks)
                    // swr (https://github.com/zeit/swr)

                    const [loading, setLoading] = useState(true)
                    const [data, setData] = useState<Data>()

                    useEffect(() => {
                      request(requestData).then(data => {
                        setLoading(false)
                        setData(data as any)
                      })
                    }, [JSON.stringify(requestData)])

                    return {
                      loading,
                      data,
                    }
                  }
                }
              `,
            )
          }
        }

        // 始终写入主文件
        const rawOutputContent = dedent`
          /* tslint:disable */
          /* eslint-disable */

          /* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

          ${
            syntheticalConfig.typesOnly
              ? content.join('\n\n').trim()
              : dedent`
                // @ts-ignore
                // prettier-ignore
                import { Method, RequestBodyType, ResponseBodyType, RequestConfig, RequestFunctionRestArgs, FileData, prepare } from 'yapi-to-typescript'
                // @ts-ignore
                import request from ${JSON.stringify(
                  getNormalizedRelativePath(
                    outputFilePath,
                    requestFunctionFilePath,
                  ),
                )}
                ${
                  !syntheticalConfig.reactHooks ||
                  !syntheticalConfig.reactHooks.enabled
                    ? ''
                    : dedent`
                      // @ts-ignore
                      import makeRequestHook from ${JSON.stringify(
                        getNormalizedRelativePath(
                          outputFilePath,
                          requestHookMakerFilePath,
                        ),
                      )}
                    `
                }

                // makeRequest
                function makeRequestRequired<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(requestConfig: TRequestConfig) {
                  const req = function (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
                    return request<TResponseData>(prepare(requestConfig, requestData), ...args)
                  }
                  req.requestConfig = requestConfig
                  return req
                }
                function makeRequestOptional<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(requestConfig: TRequestConfig) {
                  const req = function (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
                    return request<TResponseData>(prepare(requestConfig, requestData), ...args)
                  }
                  req.requestConfig = requestConfig
                  return req
                }
                function makeRequest<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(requestConfig: TRequestConfig) {
                  const optional = makeRequestOptional<TReqeustData, TResponseData, TRequestConfig>(requestConfig)
                  const required = makeRequestRequired<TReqeustData, TResponseData, TRequestConfig>(requestConfig)
                  return (
                      requestConfig.requestDataOptional
                        ? optional
                        : required
                    ) as (
                      TRequestConfig['requestDataOptional'] extends true
                        ? typeof optional
                        : typeof required
                    )
                }

                // Request
                export type Request<TReqeustData, TRequestConfig extends RequestConfig, TRequestResult> = (
                  TRequestConfig['requestDataOptional'] extends true
                    ? (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
                    : (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
                ) & {
                  requestConfig: TRequestConfig
                }

                ${content.join('\n\n').trim()}
              `
          }
        `
        // ref: https://prettier.io/docs/en/options.html
        const prettyOutputContent = prettier.format(rawOutputContent, {
          parser: 'typescript',
          printWidth: 120,
          tabWidth: 2,
          singleQuote: true,
          semi: false,
          trailingComma: 'all',
          bracketSpacing: false,
          endOfLine: 'lf',
        })
        const outputContent = `${dedent`
          /* prettier-ignore-start */
          ${prettyOutputContent}
          /* prettier-ignore-end */
        `}\n`
        await fs.outputFile(outputFilePath, outputContent)

        // 如果要生成 JavaScript 代码，
        // 则先对主文件进行 tsc 编译，主文件引用到的其他文件也会被编译，
        // 然后，删除原始的 .tsx? 文件。
        if (syntheticalConfig.target === 'javascript') {
          await this.tsc(outputFilePath)
          await Promise.all([
            fs.remove(requestFunctionFilePath).catch(noop),
            fs.remove(requestHookMakerFilePath).catch(noop),
            fs.remove(outputFilePath).catch(noop),
          ])
        }
      }),
    )
  }

  async tsc(file: string) {
    return new Promise(resolve => {
      exec(
        `${require.resolve(
          'typescript/bin/tsc',
        )} --target ES2019 --module ESNext --jsx preserve --declaration --esModuleInterop ${file}`,
        {
          cwd: this.options.cwd,
          env: process.env,
        },
        () => resolve(),
      )
    })
  }

  /** 生成请求数据类型 */
  async generateRequestDataType({
    interfaceInfo,
    typeName,
  }: {
    interfaceInfo: Interface
    typeName: string
  }): Promise<string> {
    let jsonSchema!: JSONSchema4

    switch (interfaceInfo.method) {
      case Method.GET:
      case Method.HEAD:
      case Method.OPTIONS:
        jsonSchema = propDefinitionsToJsonSchema(
          interfaceInfo.req_query.map<PropDefinition>(item => ({
            name: item.name,
            required: item.required === Required.true,
            type: 'string',
            comment: item.desc,
          })),
        )
        break
      default:
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
            )
            break
          case RequestBodyType.json:
            if (interfaceInfo.req_body_other) {
              jsonSchema = interfaceInfo.req_body_is_json_schema
                ? jsonSchemaStringToJsonSchema(interfaceInfo.req_body_other)
                : jsonToJsonSchema(JSON5.parse(interfaceInfo.req_body_other))
            }
            break
          default:
            /* istanbul ignore next */
            break
        }
        break
    }

    if (isArray(interfaceInfo.req_params) && interfaceInfo.req_params.length) {
      const paramsJsonSchema = propDefinitionsToJsonSchema(
        interfaceInfo.req_params.map<PropDefinition>(item => ({
          name: item.name,
          required: true,
          type: 'string',
          comment: item.desc,
        })),
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

    return jsonSchemaToType(jsonSchema, typeName)
  }

  /** 生成响应数据类型 */
  async generateResponseDataType({
    interfaceInfo,
    typeName,
    dataKey,
  }: {
    interfaceInfo: Interface
    typeName: string
    dataKey?: string
  }): Promise<string> {
    let jsonSchema: JSONSchema4 = {}

    switch (interfaceInfo.res_body_type) {
      case ResponseBodyType.json:
        if (interfaceInfo.res_body) {
          jsonSchema = interfaceInfo.res_body_is_json_schema
            ? jsonSchemaStringToJsonSchema(interfaceInfo.res_body)
            : mockjsTemplateToJsonSchema(JSON5.parse(interfaceInfo.res_body))
        }
        break
      default:
        return `export type ${typeName} = any`
    }

    /* istanbul ignore if */
    if (
      dataKey &&
      jsonSchema &&
      jsonSchema.properties &&
      jsonSchema.properties[dataKey]
    ) {
      jsonSchema = jsonSchema.properties[dataKey]
    }

    return jsonSchemaToType(jsonSchema, typeName)
  }

  async fetchApi<T = any>(url: string, query: Record<string, any>): Promise<T> {
    const { body: res } = await got.get<{
      errcode: any
      errmsg: any
      data: any
    }>(url, {
      searchParams: query,
      responseType: 'json',
    })
    /* istanbul ignore next */
    if (res && res.errcode) {
      throwError(res.errmsg)
    }
    return res.data || res
  }

  fetchProject = memoize(
    async ({ serverUrl, token }: SyntheticalConfig) => {
      const projectInfo = await this.fetchApi<Project>(
        `${serverUrl}/api/project/get`,
        {
          token: token!,
        },
      )
      const basePath = `/${projectInfo.basepath || '/'}`
        .replace(/\/+$/, '')
        .replace(/^\/+/, '/')
      projectInfo.basepath = basePath
      return projectInfo
    },
    ({ serverUrl, token }: SyntheticalConfig) => `${serverUrl}|${token}`,
  )

  fetchExport = memoize(
    async ({ serverUrl, token }: SyntheticalConfig) => {
      const projectInfo = await this.fetchProject({ serverUrl, token })
      const categoryList = await this.fetchApi<CategoryList>(
        `${serverUrl}/api/plugin/export`,
        {
          type: 'json',
          status: 'all',
          isWiki: 'false',
          token: token!,
        },
      )
      return categoryList.map(cat => {
        cat.list = (cat.list || []).map(item => {
          item.path = `${projectInfo.basepath}${item.path}`
          return item
        })
        return cat
      })
    },
    ({ serverUrl, token }: SyntheticalConfig) => `${serverUrl}|${token}`,
  )

  /** 获取分类的接口列表 */
  async fetchInterfaceList({
    serverUrl,
    token,
    id,
  }: SyntheticalConfig): Promise<InterfaceList> {
    const category = (
      (await this.fetchExport({ serverUrl, token })) || []
    ).find(
      cat => !isEmpty(cat) && !isEmpty(cat.list) && cat.list[0].catid === id,
    )

    if (category) {
      category.list.forEach(interfaceInfo => {
        // 实现 _category 字段
        interfaceInfo._category = omit(category, ['list'])
      })
    }

    return category ? category.list : []
  }

  /** 获取项目信息 */
  async fetchProjectInfo(syntheticalConfig: SyntheticalConfig) {
    const projectInfo = await this.fetchProject(syntheticalConfig)
    const projectCats = await this.fetchApi<CategoryList>(
      `${syntheticalConfig.serverUrl}/api/interface/getCatMenu`,
      {
        token: syntheticalConfig.token!,
        project_id: projectInfo._id,
      },
    )
    return {
      ...projectInfo,
      cats: projectCats,
      getMockUrl: () =>
        `${syntheticalConfig.serverUrl}/mock/${projectInfo._id}`,
      getDevUrl: (devEnvName: string) => {
        const env = projectInfo.env.find(e => e.name === devEnvName)
        return (env && env.domain) /* istanbul ignore next */ || ''
      },
      getProdUrl: (prodEnvName: string) => {
        const env = projectInfo.env.find(e => e.name === prodEnvName)
        return (env && env.domain) /* istanbul ignore next */ || ''
      },
    }
  }

  /** 生成接口代码 */
  async generateInterfaceCode(
    syntheticalConfig: SyntheticalConfig,
    interfaceInfo: Interface,
    categoryUID: string,
  ) {
    const extendedInterfaceInfo: ExtendedInterface = {
      ...interfaceInfo,
      parsedPath: path.parse(interfaceInfo.path),
    }
    const requestFunctionName = isFunction(
      syntheticalConfig.getRequestFunctionName,
    )
      ? await syntheticalConfig.getRequestFunctionName(
          extendedInterfaceInfo,
          changeCase,
        )
      : changeCase.camelCase(interfaceInfo.parsedPath.name)
    const requestConfigName = changeCase.camelCase(
      `${requestFunctionName}RequestConfig`,
    )
    const requestConfigTypeName = changeCase.pascalCase(requestConfigName)
    const requestDataTypeName = isFunction(
      syntheticalConfig.getRequestDataTypeName,
    )
      ? await syntheticalConfig.getRequestDataTypeName(
          extendedInterfaceInfo,
          changeCase,
        )
      : changeCase.pascalCase(`${requestFunctionName}Request`)
    const responseDataTypeName = isFunction(
      syntheticalConfig.getResponseDataTypeName,
    )
      ? await syntheticalConfig.getResponseDataTypeName(
          extendedInterfaceInfo,
          changeCase,
        )
      : changeCase.pascalCase(`${requestFunctionName}Response`)
    const requestDataType = await this.generateRequestDataType({
      interfaceInfo: interfaceInfo,
      typeName: requestDataTypeName,
    })
    const responseDataType = await this.generateResponseDataType({
      interfaceInfo: interfaceInfo,
      typeName: responseDataTypeName,
      dataKey: syntheticalConfig.dataKey,
    })
    const isRequestDataOptional = /(\{\}|any)$/s.test(requestDataType)
    const requestHookName =
      syntheticalConfig.reactHooks && syntheticalConfig.reactHooks.enabled
        ? isFunction(syntheticalConfig.reactHooks.getRequestHookName)
          ? /* istanbul ignore next */
            await syntheticalConfig.reactHooks.getRequestHookName(
              extendedInterfaceInfo,
              changeCase,
            )
          : `use${changeCase.pascalCase(requestFunctionName)}`
        : ''

    // 支持路径参数
    const paramNames = (
      interfaceInfo.req_params /* istanbul ignore next */ || []
    ).map(item => item.name)
    const paramNamesLiteral = JSON.stringify(paramNames)
    const paramNameType =
      paramNames.length === 0 ? 'string' : `'${paramNames.join("' | '")}'`

    // 支持查询参数
    const queryNames = (
      interfaceInfo.req_query /* istanbul ignore next */ || []
    ).map(item => item.name)
    const queryNamesLiteral = JSON.stringify(queryNames)
    const queryNameType =
      queryNames.length === 0 ? 'string' : `'${queryNames.join("' | '")}'`

    // 转义标题中的 /
    const escapedTitle = String(interfaceInfo.title).replace(/\//g, '\\/')

    // 接口标题
    const interfaceTitle = `[${escapedTitle}↗](${syntheticalConfig.serverUrl}/project/${interfaceInfo.project_id}/interface/api/${interfaceInfo._id})`

    // 接口摘要
    const interfaceSummary: Array<{
      label: string
      value: string | string[]
    }> = [
      {
        label: '分类',
        value: `[${interfaceInfo._category.name}↗](${syntheticalConfig.serverUrl}/project/${interfaceInfo.project_id}/interface/api/cat_${interfaceInfo.catid})`,
      },
      {
        label: '标签',
        value: interfaceInfo.tag.map(tag => `\`${tag}\``),
      },
      {
        label: '请求头',
        value: `\`${interfaceInfo.method.toUpperCase()} ${
          interfaceInfo.path
        }\``,
      },
      {
        label: '更新时间',
        value: process.env.JEST_WORKER_ID // 测试时使用 unix 时间戳
          ? String(interfaceInfo.up_time)
          : /* istanbul ignore next */
            `\`${dayjs(interfaceInfo.up_time * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}\``,
      },
    ]
    const interfaceExtraComments: string = interfaceSummary
      .filter(item => !isEmpty(item.value))
      .map(item => `* @${item.label} ${castArray(item.value).join(', ')}`)
      .join('\n')

    return dedent`
      /**
       * 接口 ${interfaceTitle} 的 **请求类型**
       *
       ${interfaceExtraComments}
       */
      ${requestDataType.trim()}

      /**
       * 接口 ${interfaceTitle} 的 **返回类型**
       *
       ${interfaceExtraComments}
       */
      ${responseDataType.trim()}

      ${
        syntheticalConfig.typesOnly
          ? ''
          : dedent`
            /**
             * 接口 ${interfaceTitle} 的 **请求配置的类型**
             *
             ${interfaceExtraComments}
             */
            type ${requestConfigTypeName} = Readonly<RequestConfig<
              ${JSON.stringify(syntheticalConfig.mockUrl)},
              ${JSON.stringify(syntheticalConfig.devUrl)},
              ${JSON.stringify(syntheticalConfig.prodUrl)},
              ${JSON.stringify(interfaceInfo.path)},
              ${JSON.stringify(syntheticalConfig.dataKey) || 'undefined'},
              ${paramNameType},
              ${queryNameType},
              ${JSON.stringify(isRequestDataOptional)}
            >>

            /**
             * 接口 ${interfaceTitle} 的 **请求配置**
             *
             ${interfaceExtraComments}
             */
            const ${requestConfigName}: ${requestConfigTypeName} = {
              mockUrl: mockUrl${categoryUID},
              devUrl: devUrl${categoryUID},
              prodUrl: prodUrl${categoryUID},
              path: ${JSON.stringify(interfaceInfo.path)},
              method: Method.${interfaceInfo.method},
              requestBodyType: RequestBodyType.${
                interfaceInfo.method === Method.GET
                  ? RequestBodyType.query
                  : interfaceInfo.req_body_type /* istanbul ignore next */ ||
                    RequestBodyType.none
              },
              responseBodyType: ResponseBodyType.${interfaceInfo.res_body_type},
              dataKey: dataKey${categoryUID},
              paramNames: ${paramNamesLiteral},
              queryNames: ${queryNamesLiteral},
              requestDataOptional: ${JSON.stringify(isRequestDataOptional)},
            }

            /**
             * 接口 ${interfaceTitle} 的 **请求函数**
             *
             ${interfaceExtraComments}
             */
            export const ${requestFunctionName} = makeRequest<${requestDataTypeName}, ${responseDataTypeName}, ${requestConfigTypeName}>(${requestConfigName})

            ${
              !syntheticalConfig.reactHooks ||
              !syntheticalConfig.reactHooks.enabled
                ? ''
                : dedent`
                  /**
                   * 接口 ${interfaceTitle} 的 **React Hook**
                   *
                   ${interfaceExtraComments}
                   */
                  export const ${requestHookName} = makeRequestHook<${requestDataTypeName}, ${requestConfigTypeName}, ReturnType<typeof ${requestFunctionName}>>(${requestFunctionName})
                `
            }
          `
      }
    `
  }
}
