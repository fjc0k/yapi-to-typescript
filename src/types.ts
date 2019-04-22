import { JSONSchema4 } from 'json-schema'
import { ParsedPath } from 'path'

interface ChangeCase {
  /**
   * @example
   * changeCase.camelCase('test string') // => 'testString'
   */
  camelCase: (value: string) => string,
  /**
   * @example
   * changeCase.constantCase('test string') // => 'TEST_STRING'
   */
  constantCase: (value: string) => string,
  /**
   * @example
   * changeCase.dotCase('test string') // => 'test.string'
   */
  dotCase: (value: string) => string,
  /**
   * @example
   * changeCase.headerCase('test string') // => 'Test-String'
   */
  headerCase: (value: string) => string,
  /**
   * @example
   * changeCase.lowerCase('TEST STRING') // => 'test string'
   */
  lowerCase: (value: string) => string,
  /**
   * @example
   * changeCase.lowerCaseFirst('TEST') // => 'tEST'
   */
  lowerCaseFirst: (value: string) => string,
  /**
   * @example
   * changeCase.paramCase('test string') // => 'test-string'
   */
  paramCase: (value: string) => string,
  /**
   * @example
   * changeCase.pascalCase('test string') // => 'TestString'
   */
  pascalCase: (value: string) => string,
  /**
   * @example
   * changeCase.pathCase('test string') // => 'test/string'
   */
  pathCase: (value: string) => string,
  /**
   * @example
   * changeCase.sentenceCase('testString') // => 'Test string'
   */
  sentenceCase: (value: string) => string,
  /**
   * @example
   * changeCase.snakeCase('test string') // => 'test_string'
   */
  snakeCase: (value: string) => string,
  /**
   * @example
   * changeCase.swapCase('Test String') // => 'tEST sTRING'
   */
  swapCase: (value: string) => string,
  /**
   * @example
   * changeCase.titleCase('a simple test') // => 'A Simple Test'
   */
  titleCase: (value: string) => string,
  /**
   * @example
   * changeCase.upperCase('test string') // => 'TEST STRING'
   */
  upperCase: (value: string) => string,
  /**
   * @example
   * changeCase.upperCaseFirst('test') // => 'Test'
   */
  upperCaseFirst: (value: string) => string,
}

/** 请求方式 */
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
}

/** 是否必需 */
export enum Required {
  /** 不必需 */
  false = '0',
  /** 必需 */
  true = '1',
}

/** 请求数据类型 */
export enum RequestBodyType {
  /** 查询字符串 */
  query = 'query',
  /** 表单 */
  form = 'form',
  /** JSON */
  json = 'json',
  /** 纯文本 */
  text = 'text',
  /** 文件 */
  file = 'file',
  /** 原始数据 */
  raw = 'raw',
}

/** 请求表单条目类型 */
export enum RequestFormItemType {
  /** 纯文本 */
  text = 'text',
  /** 文件 */
  file = 'file',
}

/** 返回数据类型 */
export enum ResponseBodyType {
  /** JSON */
  json = 'json',
  /** 纯文本 */
  text = 'text',
  /** XML */
  xml = 'xml',
  /** 原始数据 */
  raw = 'raw',

  // yapi 实际上返回的是 json，有另外的字段指示其是否是 json schema
  /** JSON Schema */
  // jsonSchema = 'json-schema',
}

/** 接口定义 */
export interface Interface {
  /** 接口 ID */
  _id: number,
  /** 接口名称 */
  title: string,
  /** 接口备注 */
  markdown: string,
  /** 请求路径 */
  path: string,
  /** 请求方式，HEAD、OPTIONS 处理与 GET 相似，其余处理与 POST 相似 */
  method: Method,
  /** 所属分类 id */
  catid: number,
  /** 仅 GET：请求串 */
  req_query: Array<{
    /** 名称 */
    name: string,
    /** 备注 */
    desc: string,
    /** 示例 */
    example: string,
    /** 是否必需 */
    required: Required,
  }>,
  /** 仅 POST：请求内容类型。为 text, file, raw 时不必特殊处理。 */
  req_body_type: RequestBodyType,
  /** `req_body_type = json` 时是否为 json schema */
  req_body_is_json_schema: boolean,
  /** `req_body_type = form` 时的请求内容 */
  req_body_form: Array<{
    /** 名称 */
    name: string,
    /** 类型 */
    type: RequestFormItemType,
    /** 备注 */
    desc: string,
    /** 示例 */
    example: string,
    /** 是否必需 */
    required: Required,
  }>,
  /** `req_body_type = json` 时的请求内容 */
  req_body_other: string,
  /** 返回数据类型 */
  res_body_type: ResponseBodyType,
  /** `res_body_type = json` 时是否为 json schema */
  res_body_is_json_schema: boolean,
  /** 返回数据 */
  res_body: string,
  [key: string]: any,
}

/** 扩展接口定义 */
export interface ExtendedInterface extends Interface {
  parsedPath: ParsedPath,
}

/** 接口列表 */
export type InterfaceList = Interface[]

/** 分类信息 */
export interface Category {
  /** 分类名称 */
  name: string,
  /** 分类备注 */
  desc: string,
  /** 分类接口列表 */
  list: InterfaceList,
}

/** 分类列表，对应数据导出的 json 内容 */
export type CategoryList = Category[]

/**
 * 配置。
 */
export interface ServerConfig {
  /**
   * YApi 服务地址。
   *
   * @example 'http://yapi.foo.bar'
   */
  serverUrl: string,
  /**
   * 生产环境名称。
   *
   * **用于获取生产环境域名。**
   *
   * 获取方式：打开项目 --> `设置` --> `环境配置` --> 点开或新增生产环境 --> 复制生产环境名称。
   *
   * @example 'prod'
   */
  prodEnvName?: string,
  /**
   * 输出文件路径。
   *
   * 可以是 `相对路径` 或 `绝对路径`。
   *
   * @example 'src/api/index.ts'
   */
  outputFilePath?: string,
  /**
   * 请求函数文件路径。
   *
   * @default 与 `outputFilePath` 同级目录下的 `request.ts` 文件
   * @example 'src/api/request.ts'
   */
  requestFunctionFilePath?: string,
  /**
   * 预处理接口信息，返回新的接口信息。
   *
   * 譬如你想对接口的 `path` 进行某些处理，就可使用该方法。
   *
   * @example
   *
   * ```js
   * interfaceInfo => {
   *   interfaceInfo.path = interfaceInfo.path.replace('v1', 'v2')
   *   return interfaceInfo
   * }
   * ```
   */
  preproccessInterface?: <T extends Interface>(interfaceInfo: T, changeCase: ChangeCase) => T,
  /**
   * 如果接口响应的结果是 `JSON` 对象，
   * 且我们想要的数据在该对象下，
   * 那我们就可将 `dataKey` 设为我们想要的数据对应的键。
   *
   * 比如该对象为 `{ code: 0, msg: '成功', data: 100 }`，
   * 我们想要的数据为 `100`，
   * 则我们可将 `dataKey` 设为 `data`。
   *
   * @example 'data'
   */
  dataKey?: string,
  /**
   * 项目列表。
   */
  projects: Array<
    Pick<ServerConfig, 'prodEnvName' | 'outputFilePath' | 'requestFunctionFilePath' | 'preproccessInterface' | 'dataKey'> & {
      /**
       * 项目的唯一标识。
       *
       * 获取方式：打开项目 --> `设置` --> `token配置` --> 复制 token。
       *
       * @example 'e02a47122259d0c1973a9ff81cabb30685d64abc72f39edaa1ac6b6a792a647d'
       */
      token: string,
      /**
       * 分类列表。
       */
      categories: Array<
        Pick<ServerConfig, 'prodEnvName' | 'outputFilePath' | 'requestFunctionFilePath' | 'preproccessInterface' | 'dataKey'> & {
          /**
           * 分类 ID。
           *
           * 获取方式：打开项目 --> 点开分类 --> 复制浏览器地址栏 `/api/cat_` 后面的数字。
           *
           * @example 20
           */
          id: number,
          /**
           * 获取请求函数的名称。
           *
           * @param interfaceInfo 接口信息
           * @param changeCase 常用的大小写转换函数集合对象
           * @returns 请求函数的名称
           */
          getRequestFunctionName(interfaceInfo: ExtendedInterface, changeCase: ChangeCase): string,
          /**
           * 获取请求数据类型的名称。
           *
           * @default changeCase.pascalCase(`${requestFunctionName}Request`)
           * @param interfaceInfo 接口信息
           * @param changeCase 常用的大小写转换函数集合对象
           * @returns 请求数据类型的名称
           */
          getRequestDataTypeName?(interfaceInfo: ExtendedInterface, changeCase: ChangeCase): string,
          /**
           * 获取响应数据类型的名称。
           *
           * @default changeCase.pascalCase(`${requestFunctionName}Response`)
           * @param interfaceInfo 接口信息
           * @param changeCase 常用的大小写转换函数集合对象
           * @returns 响应数据类型的名称
           */
          getResponseDataTypeName?(interfaceInfo: ExtendedInterface, changeCase: ChangeCase): string,
        }
      >,
    }
  >,
}

export type SyntheticalConfig = Partial<(
  ServerConfig
  & ServerConfig['projects'][0]
  & ServerConfig['projects'][0]['categories'][0]
  & {
    mockUrl: string,
    prodUrl: string,
  }
)>

export type Config = ServerConfig | ServerConfig[]

/**
 * 请求配置。
 */
export interface RequestConfig<
  MockUrl extends string = string,
  ProdUrl extends string = string,
  Path extends string = string,
  DataKey extends string | undefined = undefined,
> {
  /** 接口 Mock 地址，结尾无 `/` */
  mockUrl: MockUrl,
  /** 接口生产环境地址，结尾无 `/` */
  prodUrl: ProdUrl,
  /** 接口路径，以 `/` 开头 */
  path: Path,
  /** 请求方法 */
  method: Method,
  /** 请求数据类型 */
  requestBodyType: RequestBodyType,
  /** 返回数据类型 */
  responseBodyType: ResponseBodyType,
  /** 数据所在键 */
  dataKey: DataKey,
}

/**
 * 请求参数。
 */
export interface RequestFunctionParams extends RequestConfig {
  /** 请求数据，不含文件数据 */
  data: any,
  /** 请求文件数据 */
  fileData: Record<string, any>,
}

/**
 * 请求函数。
 *
 * 发起请求获得响应结果后应根据 `responseBodyType` 和 `dataKey` 对结果进行处理，并将处理后的数据返回。
 */
export type RequestFunction = (
  /** 参数 */
  params: RequestFunctionParams,
) => Promise<any>

/** 属性定义 */
export interface PropDefinition {
  /** 属性名称 */
  name: string,
  /** 是否必需 */
  required: boolean,
  /** 类型 */
  type: JSONSchema4['type'],
  /** 注释 */
  comment: string,
}

/** 属性定义列表 */
export type PropDefinitions = PropDefinition[]
