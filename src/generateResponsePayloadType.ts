import { JSONSchema4 } from 'json-schema'
import JSON5 from 'json5'
import { Api, ResponseBodyType } from './types'
import mockjsJsonToJsonSchema from './mockjsJsonToJsonSchema'
import jsonSchemaToTypes from './jsonSchemaToTypes'

/**
 * 生成返回数据的 typescript 类型定义。
 *
 * @param api Api
 * @param interfaceName 接口名称
 * @returns typescript 定义
 */
export default async function generateResponsePayloadType(api: Api, interfaceName: string): Promise<string> {
  let jsonSchema: JSONSchema4
  switch (api.res_body_type) {
    case ResponseBodyType.Json:
    case ResponseBodyType.JsonSchema:
      if (api.res_body_is_json_schema) {
        jsonSchema = JSON.parse(api.res_body)
      } else {
        jsonSchema = api.res_body && mockjsJsonToJsonSchema(JSON5.parse(api.res_body))
      }
      break
    default:
      break
  }
  return jsonSchemaToTypes(jsonSchema, interfaceName)
}
