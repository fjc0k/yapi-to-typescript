import { JSONSchema4 } from 'json-schema'
import Mock from 'mockjs'

// fix: Mock.toJSONSchema 产生的 properties 为数组，然而 JSONSchema4 的 properties 为对象
const fixProperties = (obj: any): JSONSchema4 => {
  if (obj.properties) {
    obj.properties = obj.properties.reduce(
      (res: any, prop: any) => {
        res[prop.name] = fixProperties(prop)
        return res
      },
      {},
    )
  }
  if (obj.items) {
    obj.items = obj.items.map((item: any) => fixProperties(item))
  }
  return obj
}

/**
 * 将 mockjs 格式的 json 对象转换为 json-schema。
 *
 * @param obj 要转换的对象
 * @returns 符合 JSONSchema4 格式的对象
 */
export default function mockjsJsonToJsonSchema(obj: object): JSONSchema4 {
  return fixProperties(Mock.toJSONSchema(obj))
}
