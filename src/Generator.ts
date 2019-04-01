import JSON5 from 'json5'
import { CategoryList, Config, Interface, InterfaceList, Method, PropDefinition, RequestBodyType, RequestFormItemType, Required, ResponseBodyType } from './types'
import { isEmpty } from 'vtils'
import { JSONSchema4 } from 'json-schema'
import { jsonSchemaStringToJsonSchema, jsonSchemaToType, jsonToJsonSchema, mockjsTemplateToJsonSchema, propDefinitionsToJsonSchema } from './utils'

export default class Generator {
  /** 配置 */
  private config: Config

  /** { 项目标识: 分类列表 } */
  private projectIdToCategoryList: Record<string, CategoryList | undefined> = Object.create(null)

  constructor(config: Config) {
    this.config = config
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
      case ResponseBodyType.jsonSchema:
        if (interfaceInfo.res_body) {
          jsonSchema = interfaceInfo.res_body_is_json_schema
            ? jsonSchemaStringToJsonSchema(interfaceInfo.res_body)
            : mockjsTemplateToJsonSchema(JSON5.parse(interfaceInfo.res_body))
        }
        break
      default:
        break
    }

    if (dataKey && jsonSchema && jsonSchema.properties && jsonSchema.properties[dataKey]) {
      jsonSchema = jsonSchema.properties[dataKey]
    }

    return jsonSchemaToType(jsonSchema, typeName)
  }

  /** 获取分类的接口列表 */
  async fetchCategoryInterfaceList(
    { serverUrl, token, categoryId }: {
      serverUrl: string,
      token: string,
      categoryId: number,
    },
  ): Promise<InterfaceList> {
    const projectId: string = `${serverUrl}|${token}`

    if (!(projectId in this.projectIdToCategoryList)) {
      this.projectIdToCategoryList[projectId] = []
    }

    const category = (this.projectIdToCategoryList[projectId] || []).find(
      cat => (
        !isEmpty(cat)
          && !isEmpty(cat.list)
          && cat.list[0].catid === categoryId
      ),
    )

    return category ? category.list : []
  }
}
