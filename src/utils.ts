import jsonSchemaGenerator from 'json-schema-generator'
import Mock from 'mockjs'
import path from 'path'
import {castArray, forOwn, isArray, isEmpty, isObject, randomString} from 'vtils'
import {compile, Options} from 'json-schema-to-typescript'
import {FileData} from './helpers'
import {JSONSchema4} from 'json-schema'
import {PropDefinitions} from './types'

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
    .replace(
      /^(?=[^.])/,
      './',
    )
    .replace(
      /\.(ts|js)x?$/i,
      '',
    )
}

/**
 * 原地处理 JSONSchema。
 *
 * @param jsonSchema 待处理的 JSONSchema
 * @returns 处理后的 JSONSchema
 */
export function processJsonSchema<T extends JSONSchema4>(jsonSchema: T): T {
  /* istanbul ignore if */
  if (!isObject(jsonSchema)) return jsonSchema

  // 去除 title 和 id，防止 json-schema-to-typescript 提取它们作为接口名
  delete jsonSchema.title
  delete jsonSchema.id

  // 忽略数组长度限制
  delete jsonSchema.minItems
  delete jsonSchema.maxItems

  // 将 additionalProperties 设为 false
  jsonSchema.additionalProperties = false

  // Mock.toJSONSchema 产生的 properties 为数组，然而 JSONSchema4 的 properties 为对象
  if (isArray(jsonSchema.properties)) {
    jsonSchema.properties = (jsonSchema.properties as JSONSchema4[])
      .reduce<Exclude<JSONSchema4['properties'], undefined>>(
      (props, js) => {
        props[js.name] = js
        return props
      },
      {},
    )
  }

  // 继续处理对象的子元素
  if (jsonSchema.properties) {
    forOwn(jsonSchema.properties, processJsonSchema)
  }

  // 继续处理数组的子元素
  if (jsonSchema.items) {
    castArray(jsonSchema.items).forEach(processJsonSchema)
  }

  return jsonSchema
}

/**
 * 将 JSONSchema 字符串转为 JSONSchema 对象。
 *
 * @param str 要转换的 JSONSchema 字符串
 * @returns 转换后的 JSONSchema 对象
 */
export function jsonSchemaStringToJsonSchema(str: string): JSONSchema4 {
  return processJsonSchema(
    JSON.parse(str),
  )
}

/**
 * 获得 JSON 数据的 JSONSchema 对象。
 *
 * @param json JSON 数据
 * @returns JSONSchema 对象
 */
export function jsonToJsonSchema(json: object): JSONSchema4 {
  return processJsonSchema(
    jsonSchemaGenerator(json),
  )
}

/**
 * 获得 mockjs 模板的 JSONSchema 对象。
 *
 * @param template mockjs 模板
 * @returns JSONSchema 对象
 */
export function mockjsTemplateToJsonSchema(template: object): JSONSchema4 {
  return processJsonSchema(
    Mock.toJSONSchema(template) as any,
  )
}

/**
 * 获得属性定义列表的 JSONSchema 对象。
 *
 * @param propDefinitions 属性定义列表
 * @returns JSONSchema 对象
 */
export function propDefinitionsToJsonSchema(propDefinitions: PropDefinitions): JSONSchema4 {
  return processJsonSchema({
    type: 'object',
    required: propDefinitions.reduce<string[]>(
      (res, prop) => {
        if (prop.required) {
          res.push(prop.name.trim())
        }
        return res
      },
      [],
    ),
    properties: propDefinitions.reduce<Exclude<JSONSchema4['properties'], undefined>>(
      (res, prop) => {
        res[prop.name.trim()] = {
          type: prop.type,
          description: prop.comment,
          ...(prop.type === 'file' as any ? {tsType: FileData.name} : {}),
        }
        return res
      },
      {},
    ),
  })
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
export async function jsonSchemaToType(jsonSchema: JSONSchema4, typeName: string): Promise<string> {
  if (isEmpty(jsonSchema)) {
    return `export interface ${typeName} {}`
  }
  // JSTT 会转换 typeName，因此传入一个全大写的假 typeName，生成代码后再替换回真正的 typeName
  const fakeTypeName = `FAKE${randomString()}`.toUpperCase()
  const code = await compile(jsonSchema, fakeTypeName, JSTTOptions)
  return code.replace(fakeTypeName, typeName).trim()
}
