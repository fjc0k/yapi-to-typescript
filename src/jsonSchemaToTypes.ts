import { compile, Options } from 'json-schema-to-typescript'
import { JSONSchema4 } from 'json-schema'

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
 * 1. 去除 title 和 id，防止 JSTT 自作主张提取它们作为接口名
 * 2. 将 additionalProperties 设为 false
 */
const normalizeSchema = (schema: JSONSchema4): JSONSchema4 => {
  if (!schema) return schema
  delete schema.title
  delete schema.id
  schema.additionalProperties = false
  if (schema.properties) {
    Object.keys(schema.properties).forEach(key => {
      normalizeSchema(schema.properties[key])
    })
  }
  if (schema.items) {
    (Array.isArray(schema.items) ? schema.items : [schema.items]).forEach(item => {
      normalizeSchema(item)
    })
  }
  return schema
}

export default async function jsonSchemaToTypes(schema: JSONSchema4, interfaceName: string): Promise<string> {
  if (!schema) {
    return `export type ${interfaceName} = any`
  }
  return compile(normalizeSchema(schema), interfaceName, JSTTOptions)
}
