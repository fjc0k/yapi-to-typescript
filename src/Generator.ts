import * as changeCase from 'change-case'
import fs from 'fs-extra'
import JSON5 from 'json5'
import path from 'path'
import request from 'request-promise-native'
import { castArray, dedent, isEmpty, isFunction } from 'vtils'
import { CategoryList, Config, ExtendedInterface, Interface, InterfaceList, Method, PropDefinition, RequestBodyType, RequestFormItemType, Required, ResponseBodyType, ServerConfig, SyntheticalConfig } from './types'
import { getNormalizedRelativePath, jsonSchemaStringToJsonSchema, jsonSchemaToType, jsonToJsonSchema, mockjsTemplateToJsonSchema, propDefinitionsToJsonSchema, throwError } from './utils'
import { JSONSchema4 } from 'json-schema'

interface OutputFileList {
  [outputFilePath: string]: {
    syntheticalConfig: SyntheticalConfig,
    content: string[],
    requestFilePath: string,
  },
}

export class Generator {
  /** 配置 */
  private config: ServerConfig[] = []

  /** { 项目标识: 分类列表 } */
  private projectIdToCategoryList: Record<string, CategoryList | undefined> = Object.create(null)

  constructor(config: Config) {
    // config 可能是对象或数组，统一为数组
    this.config = castArray(config)
  }

  async generate(): Promise<OutputFileList> {
    const outputFileList: OutputFileList = Object.create(null)

    await Promise.all(
      this.config.map(
        async (serverConfig, serverIndex) => Promise.all(
          serverConfig.projects.map(
            async (projectConfig, projectIndex) => {
              const projectInfo = await Generator.fetchProjectInfo({
                ...serverConfig,
                ...projectConfig,
              })
              await Promise.all(
                projectConfig.categories.map(
                  async (categoryConfig, categoryIndex) => {
                    const categoryIds = categoryConfig.id === 0
                      ? projectInfo.cats.map(cat => cat._id)
                      : castArray(categoryConfig.id)
                        .filter(
                          id => !!projectInfo.cats.find(cat => cat._id === id),
                        )
                    await Promise.all(
                      categoryIds.map(async (id, categoryIndex2) => {
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
                        syntheticalConfig.devUrl = projectInfo.getDevUrl(syntheticalConfig.devEnvName!)
                        syntheticalConfig.prodUrl = projectInfo.getProdUrl(syntheticalConfig.prodEnvName!)
                        const interfaceList = await this.fetchInterfaceList(syntheticalConfig)
                        const outputFilePath = path.resolve(
                          process.cwd(),
                          syntheticalConfig.outputFilePath!,
                        )
                        const categoryUID = `_${serverIndex}_${projectIndex}_${categoryIndex}_${categoryIndex2}`
                        const categoryCode = [
                          syntheticalConfig.typesOnly
                            ? ''
                            : dedent`
                              const mockUrl${categoryUID} = ${JSON.stringify(syntheticalConfig.mockUrl)} as any
                              const devUrl${categoryUID} = ${JSON.stringify(syntheticalConfig.devUrl)} as any
                              const prodUrl${categoryUID} = ${JSON.stringify(syntheticalConfig.prodUrl)} as any
                              const dataKey${categoryUID} = ${JSON.stringify(syntheticalConfig.dataKey)} as any
                            `,
                          ...(await Promise.all(
                            interfaceList.map(
                              async interfaceInfo => {
                                interfaceInfo = isFunction(syntheticalConfig.preproccessInterface)
                                  ? syntheticalConfig.preproccessInterface(interfaceInfo, changeCase)
                                  : interfaceInfo
                                return Generator.generateInterfaceCode(
                                  syntheticalConfig,
                                  interfaceInfo,
                                  categoryUID,
                                )
                              },
                            ),
                          )),
                        ].join('\n\n')
                        if (!outputFileList[outputFilePath]) {
                          outputFileList[outputFilePath] = {
                            syntheticalConfig,
                            content: [],
                            requestFilePath: (
                              syntheticalConfig.requestFunctionFilePath
                                ? path.resolve(
                                  process.cwd(),
                                  syntheticalConfig.requestFunctionFilePath,
                                )
                                : path.join(
                                  path.dirname(outputFilePath),
                                  'request.ts',
                                )
                            ),
                          }
                        }
                        outputFileList[outputFilePath].content.push(categoryCode)
                      }),
                    )
                  },
                ),
              )
            },
          ),
        ),
      ),
    )

    return outputFileList
  }

  async write(outputFileList: OutputFileList) {
    return Promise.all(
      Object.keys(outputFileList).map(async outputFilePath => {
        const { content, requestFilePath, syntheticalConfig } = outputFileList[outputFilePath]

        // 若非 typesOnly 模式且 request 文件不存在，则写入 request 文件
        if (!syntheticalConfig.typesOnly && !(await fs.pathExists(requestFilePath))) {
          await fs.outputFile(
            requestFilePath,
            dedent`
              import { RequestFunction } from 'yapi-to-typescript'

              /** 是否是生产环境 */
              const isProd = false

              /**
               * 请求函数。
               *
               * **注意**：若 dataKey 不为空，取得接口返回值后，应类似这样返回结果：
               *
               * \`\`\`js
               * return dataKey ? (response[dataKey] || response) : response
               * \`\`\`
               */
              const request: RequestFunction = ({
                /** 接口 Mock 地址，结尾无 \`/\` */
                mockUrl,
                /** 接口测试环境地址，结尾无 \`/\` */
                devUrl,
                /** 接口生产环境地址，结尾无 \`/\` */
                prodUrl,
                /** 接口路径，以 \`/\` 开头 */
                path,
                /** 请求方法 */
                method,
                /** 请求数据类型 */
                requestBodyType,
                /** 返回数据类型 */
                responseBodyType,
                /** 接口返回值中数据所在的键 */
                dataKey,
                /** 请求数据，不含文件数据 */
                data,
                /** 请求文件数据 */
                fileData
              }): Promise<any> => {
                return new Promise((resolve, reject) => {
                  /** 请求地址 */
                  const url = \`\${isProd ? prodUrl : mockUrl}\${path}\`

                  /** 是否含有文件数据 */
                  const hasFileData = Object.keys(fileData).length > 0

                  // 在这里实现请求逻辑
                })
              }

              export default request
            `,
          )
        }

        // 始终写入主文件
        const requestFileRelativePath = getNormalizedRelativePath(
          path.dirname(outputFilePath),
          requestFilePath,
        )
        const requestFileRelativePathWithoutExt = requestFileRelativePath.replace(
          /\.(ts|js)$/i,
          '',
        )
        await fs.outputFile(
          outputFilePath,
          dedent`
            /* tslint:disable */
            /* eslint-disable */

            /* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

            ${syntheticalConfig.typesOnly ? content.join('\n\n').trim() : dedent`
              // @ts-ignore
              import { Method, RequestBodyType, ResponseBodyType, RequestConfig, FileData, parseRequestData } from 'yapi-to-typescript'
              import request from ${JSON.stringify(requestFileRelativePathWithoutExt)}

              ${content.join('\n\n').trim()}
            `}
          `,
        )
      }),
    )
  }

  /** 生成请求数据类型 */
  static async generateRequestDataType(
    { interfaceInfo, typeName }: {
      interfaceInfo: Interface,
      typeName: string,
    },
  ): Promise<string> {
    let jsonSchema: JSONSchema4 = {}

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
                type: (item.type === RequestFormItemType.file ? 'file' : 'string') as any,
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
            break
        }
        break
    }

    return jsonSchemaToType(jsonSchema, typeName)
  }

  /** 生成响应数据类型 */
  static async generateResponseDataType(
    { interfaceInfo, typeName, dataKey }: {
      interfaceInfo: Interface,
      typeName: string,
      dataKey?: string,
    },
  ): Promise<string> {
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

    if (dataKey && jsonSchema && jsonSchema.properties && jsonSchema.properties[dataKey]) {
      jsonSchema = jsonSchema.properties[dataKey]
    }

    return jsonSchemaToType(jsonSchema, typeName)
  }

  static async fetchApi<T = any>(url: string, query: Record<string, any>): Promise<T> {
    const res = await request.get(url, { qs: query, json: true })
    if (res && res.errcode) {
      throwError(res.errmsg)
    }
    return res.data || res
  }

  /** 获取分类的接口列表 */
  async fetchInterfaceList({ serverUrl, token, id }: SyntheticalConfig): Promise<InterfaceList> {
    const projectId: string = `${serverUrl}|${token}`

    if (!(projectId in this.projectIdToCategoryList)) {
      const categoryList = await Generator.fetchApi<CategoryList>(
        `${serverUrl}/api/plugin/export`,
        {
          type: 'json',
          status: 'all',
          isWiki: 'false',
          token: token!,
        },
      )
      this.projectIdToCategoryList[projectId] = categoryList
    }

    const category = (this.projectIdToCategoryList[projectId] || []).find(
      cat => (
        !isEmpty(cat)
          && !isEmpty(cat.list)
          && cat.list[0].catid === id
      ),
    )

    return category ? category.list : []
  }

  /** 获取项目信息 */
  static async fetchProjectInfo(syntheticalConfig: SyntheticalConfig) {
    const projectInfo = await this.fetchApi<{
      _id: number,
      name: string,
      basepath: string,
      env: Array<{
        name: string,
        domain: string,
      }>,
    }>(
      `${syntheticalConfig.serverUrl}/api/project/get`,
      { token: syntheticalConfig.token! },
    )
    const projectCats = await this.fetchApi<Array<{
      _id: number,
      name: string,
      desc: string,
    }>>(
      `${syntheticalConfig.serverUrl}/api/interface/getCatMenu`,
      { token: syntheticalConfig.token!, project_id: projectInfo._id },
    )
    return {
      ...projectInfo,
      cats: projectCats,
      getMockUrl: () => `${syntheticalConfig.serverUrl}/mock/${projectInfo._id}`,
      getDevUrl: (devEnvName: string) => {
        const env = projectInfo.env.find(
          e => e.name === devEnvName,
        )
        return env && env.domain || ''
      },
      getProdUrl: (prodEnvName: string) => {
        const env = projectInfo.env.find(
          e => e.name === prodEnvName,
        )
        return env && env.domain || ''
      },
    }
  }

  /** 生成接口代码 */
  static async generateInterfaceCode(syntheticalConfig: SyntheticalConfig, interfaceInfo: Interface, categoryUID: string) {
    const extendedInterfaceInfo: ExtendedInterface = {
      ...interfaceInfo,
      parsedPath: path.parse(interfaceInfo.path),
    }
    const requestFunctionName = await syntheticalConfig.getRequestFunctionName!(
      extendedInterfaceInfo,
      changeCase,
    )
    const requestDataTypeName = isFunction(syntheticalConfig.getRequestDataTypeName)
      ? await syntheticalConfig.getRequestDataTypeName(
        extendedInterfaceInfo,
        changeCase,
      )
      : changeCase.pascalCase(`${requestFunctionName}Request`)
    const responseDataTypeName = isFunction(syntheticalConfig.getResponseDataTypeName)
      ? await syntheticalConfig.getResponseDataTypeName(
        extendedInterfaceInfo,
        changeCase,
      )
      : changeCase.pascalCase(`${requestFunctionName}Response`)
    const requestDataType = await Generator.generateRequestDataType({
      interfaceInfo: interfaceInfo,
      typeName: requestDataTypeName,
    })
    const responseDataType = await Generator.generateResponseDataType({
      interfaceInfo: interfaceInfo,
      typeName: responseDataTypeName,
      dataKey: syntheticalConfig.dataKey,
    })
    const isRequestDataRequired = /(\{\}|any)$/s.test(requestDataType)
    return dedent`
      /**
       * 接口 **${interfaceInfo.title}** 的 **请求类型**
       */
      ${requestDataType.trim()}

      /**
       * 接口 **${interfaceInfo.title}** 的 **返回类型**
       */
      ${responseDataType.trim()}

      ${syntheticalConfig.typesOnly ? '' : dedent`
        /**
         * 接口 **${interfaceInfo.title}** 的 **请求函数**
         */
        export function ${requestFunctionName}(requestData${isRequestDataRequired ? '?' : ''}: ${requestDataTypeName}): Promise<${responseDataTypeName}> {
          return request({
            ...${requestFunctionName}.requestConfig,
            ...parseRequestData(requestData)
          } as any)
        }

        /**
         * 接口 **${interfaceInfo.title}** 的 **请求配置**
         */
        ${requestFunctionName}.requestConfig = Object.freeze({
          mockUrl: mockUrl${categoryUID},
          devUrl: devUrl${categoryUID},
          prodUrl: prodUrl${categoryUID},
          path: ${JSON.stringify(interfaceInfo.path)},
          method: Method.${interfaceInfo.method},
          requestBodyType: RequestBodyType.${interfaceInfo.method === Method.GET ? RequestBodyType.query : interfaceInfo.req_body_type || RequestBodyType.none},
          responseBodyType: ResponseBodyType.${interfaceInfo.res_body_type},
          dataKey: dataKey${categoryUID},
        } as RequestConfig<
          ${JSON.stringify(syntheticalConfig.mockUrl)},
          ${JSON.stringify(syntheticalConfig.devUrl)},
          ${JSON.stringify(syntheticalConfig.prodUrl)},
          ${JSON.stringify(interfaceInfo.path)},
          ${JSON.stringify(syntheticalConfig.dataKey)}
        >)
      `}
    `
  }
}
