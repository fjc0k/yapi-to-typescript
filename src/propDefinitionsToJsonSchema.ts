import { JSONSchema4 } from 'json-schema'
import { PropDefinitions } from './types'

/**
 * 将属性定义转换为 json-schema。
 *
 * @param propDefinitionsefinitions 要转换的属性定义列表
 * @returns 符合 JSONSchema4 格式的对象
 */
export default function propDefinitionsToJsonSchema(propDefinitionsefinitions: PropDefinitions): JSONSchema4 {
  return {
    type: 'object',
    required: propDefinitionsefinitions.reduce((res, prop) => {
      if (prop.required) {
        res.push(prop.name)
      }
      return res
    }, []),
    properties: propDefinitionsefinitions.reduce((res, prop) => {
      res[prop.name] = {
        type: prop.type,
        description: prop.comment,
        // 特殊处理 file
        ...(prop.type === 'file' ? { tsType: 'File' } : {}),
      }
      return res
    }, {} as JSONSchema4['properties']),
  }
}
