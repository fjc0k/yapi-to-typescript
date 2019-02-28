import { JSONSchema4 } from 'json-schema'
// @ts-ignore
import jsonSchemaGenerator from 'json-schema-generator'
import JSON5 from 'json5'
import { Api, Method, Required, RequestBodyType, RequestFormItemType, PropDefinition } from './types'
import propDefinitionsToJsonSchema from './propDefinitionsToJsonSchema'
import jsonSchemaToTypes from './jsonSchemaToTypes'

/**
 * 生成请求数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @returns typescript 定义
 */
export default async function generateRequestPayloadType(api: Api, interfaceName: string): Promise<string> {
  let jsonSchema: JSONSchema4 = {}
  switch (api.method) {
    case Method.GET:
    case Method.HEAD:
    case Method.OPTIONS:
      jsonSchema = propDefinitionsToJsonSchema(
        api.req_query.map<PropDefinition>(item => ({
          name: item.name,
          required: item.required === Required.True,
          type: 'string',
          comment: item.desc,
        })),
      )
      break
    default:
      switch (api.req_body_type) {
        case RequestBodyType.Form:
          jsonSchema = propDefinitionsToJsonSchema(
            api.req_body_form.map<PropDefinition>(item => ({
              name: item.name,
              required: item.required === Required.True,
              type: (item.type === RequestFormItemType.File ? 'file' : 'string') as any,
              comment: item.desc,
            })),
          )
          break
        case RequestBodyType.Json:
          if (api.req_body_other) {
            jsonSchema = api.req_body_is_json_schema
              ? JSON.parse(api.req_body_other)
              : jsonSchemaGenerator(JSON5.parse(api.req_body_other))
          }
          break
        default:
          break
      }
      break
  }
  return jsonSchemaToTypes(jsonSchema, interfaceName)
}
