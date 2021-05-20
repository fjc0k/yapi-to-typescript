import JSON5 from 'json5'
import Mock from 'mockjs'
import path from 'path'
import toJsonSchema from 'to-json-schema'
import { castArray, forOwn, isArray, isEmpty, isObject } from 'vtils'
import { compile, Options } from 'json-schema-to-typescript'
import { Defined } from 'vtils/types'
import { FileData } from './helpers'
import {
  Interface,
  PropDefinition,
  PropDefinitions,
  RequestBodyType,
  RequestFormItemType,
  Required,
  ResponseBodyType,
} from './types'
import { JSONSchema4 } from 'json-schema'

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

  // 删除通过 swagger 导入时未剔除的 ref
  delete jsonSchema.$ref
  delete jsonSchema.$$ref

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
    forOwn(jsonSchema.properties, processJsonSchema)
  }

  // 继续处理数组的子元素
  if (jsonSchema.items) {
    castArray(jsonSchema.items).forEach(processJsonSchema)
  }

  // 处理 oneOf
  if (jsonSchema.oneOf) {
    jsonSchema.oneOf.forEach(processJsonSchema)
  }

  // 处理 anyOf
  if (jsonSchema.anyOf) {
    jsonSchema.anyOf.forEach(processJsonSchema)
  }

  // 处理 allOf
  if (jsonSchema.allOf) {
    jsonSchema.allOf.forEach(processJsonSchema)
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
  return processJsonSchema(JSON.parse(str))
}

/**
 * 获得 JSON 数据的 JSONSchema 对象。
 *
 * @param json JSON 数据
 * @returns JSONSchema 对象
 */
export function jsonToJsonSchema(json: object): JSONSchema4 {
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
  return processJsonSchema(schema as any)
}

/**
 * 获得 mockjs 模板的 JSONSchema 对象。
 *
 * @param template mockjs 模板
 * @returns JSONSchema 对象
 */
export function mockjsTemplateToJsonSchema(template: object): JSONSchema4 {
  return processJsonSchema(Mock.toJSONSchema(template) as any)
}

/**
 * 获得属性定义列表的 JSONSchema 对象。
 *
 * @param propDefinitions 属性定义列表
 * @returns JSONSchema 对象
 */
export function propDefinitionsToJsonSchema(
  propDefinitions: PropDefinitions,
): JSONSchema4 {
  return processJsonSchema({
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
  const code = await compile(jsonSchema, fakeTypeName, JSTTOptions)
  delete jsonSchema.id
  return code.replace(fakeTypeName, typeName).trim()
}

export function getRequestDataJsonSchema(
  interfaceInfo: Interface,
): JSONSchema4 {
  let jsonSchema!: JSONSchema4

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

  if (isArray(interfaceInfo.req_query) && interfaceInfo.req_query.length) {
    const queryJsonSchema = propDefinitionsToJsonSchema(
      interfaceInfo.req_query.map<PropDefinition>(item => ({
        name: item.name,
        required: item.required === Required.true,
        type: item.type || 'string',
        comment: item.desc,
      })),
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

  if (isArray(interfaceInfo.req_params) && interfaceInfo.req_params.length) {
    const paramsJsonSchema = propDefinitionsToJsonSchema(
      interfaceInfo.req_params.map<PropDefinition>(item => ({
        name: item.name,
        required: true,
        type: item.type || 'string',
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

  return jsonSchema
}

export function getResponseDataJsonSchema(
  interfaceInfo: Interface,
  dataKey?: string,
): JSONSchema4 {
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
      jsonSchema = { __is_any__: true }
      break
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

  return jsonSchema
}
