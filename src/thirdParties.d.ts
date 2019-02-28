declare module 'json-schema-generator' {
  import { JSONSchema4 } from 'json-schema'

  function jsonSchemaGenerator(json: object): JSONSchema4

  export default jsonSchemaGenerator
}
