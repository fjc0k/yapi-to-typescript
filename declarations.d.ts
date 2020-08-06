declare module 'json-schema-generator' {
  import {JSONSchema4} from 'json-schema'

  function index(json: any): JSONSchema4

  export = index
}
