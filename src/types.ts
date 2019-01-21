import { ParsedPath } from 'path'
import { JSONSchema4 } from 'json-schema'
import * as changeCase from 'change-case'
import { SuperAgent, SuperAgentRequest } from 'superagent'
import { FileData } from './utils'

// 参考：https://github.com/YMFE/yapi/blob/master/server/models/interface.js#L9

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
  False = '0',
  /** 必需 */
  True = '1',
}

/** 请求数据类型 */
export enum RequestBodyType {
  Form = 'form',
  Json = 'json',
  Text = 'text',
  File = 'file',
  Raw = 'raw',
}

/** 请求表单条目类型 */
export enum RequestFormItemType {
  Text = 'text',
  File = 'file',
}

/** 返回数据类型 */
export enum ResponseBodyType {
  Json = 'json',
  Text = 'text',
  Xml = 'xml',
  Raw = 'raw',
  JsonSchema = 'json-schema',
}

export interface Api {
  /** 接口名称 */
  title: string,
  /** 接口备注 */
  markdown: string,
  /** 请求路径 */
  path: string,
  /** 请求方式，HEAD、OPTIONS 处理与 GET 相似，其余处理与 POST 相似 */
  method: Method,
  /** 分类 id */
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
  req_body_type?: RequestBodyType,
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
}

/** API 列表 */
export type ApiList = Api[]

/** API 集合，对应数据导出的 json 内容 */
export type ApiCollection = Array<{
  /** 分类名称 */
  name: string,
  /** 分类备注 */
  desc: string,
  /** 分类接口列表 */
  list: ApiList,
}>

/** 属性定义 */
export type PropDefinition = {
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

/** 接口类型 */
export enum InterfaceType {
  /** 请求 */
  Request = 0,
  /** 响应 */
  Response = 1,
}

/** 配置 */
export interface Config {
  /** 项目 url */
  projectUrl: string,
  /** 登录信息 */
  login: {
    /** 登录方式：classical（普通登录）、ldap（LDAP） */
    method?: 'classical' | 'ldap',
    /** 登录邮箱 */
    email: string,
    /** 登录密码 */
    password: string,
  },
  /** 随请求发送的其他 Cookie */
  extraCookies?: string,
  /** 数据所在字段，不设置表示整体都是数据 */
  dataKey?: string,
  /** 生成的 ts 文件放在这里 */
  targetFile: string,
  /** 要处理的分类列表 */
  categories: {
    /** 分类 id */
    [id: number]: {
      /** 获取发起请求函数的名称 */
      getRequestFunctionName: (api: ExtendedApi) => string,
      /** 获取 ts 接口的名称 */
      getInterfaceName: (api: ExtendedApi, interfaceType: InterfaceType) => string,
    },
  },
}

/** 请求载荷 */
export interface RequestPayload {
  /** 请求路径，即 yapi 中的不含基本路径的 `接口路径`，如：`/user/getInfo` */
  path: Api['path'],
  /** 请求方法，如：`GET`、`POST`、`PUT`、`DELETE` 等 */
  method: Api['method'],
  /** 请求主体类型，如：`form`、`json`、`text` 等 */
  requestBodyType: Api['req_body_type'],
  /** 响应主体类型，如：`json`、`text` 等 */
  responseBodyType: Api['res_body_type'],
  /** 请求数据，一般是一个对象，需根据不同的 `请求主体类型` 予以加工并发送 */
  data: any,
  /** 要发送的文件数据 */
  fileData: { [key: string]: FileData },
}

/** 请求，应返回包含结果的 Promise */
export type Request = (payload: RequestPayload) => Promise<any>

/** 扩展 API */
export type ExtendedApi = Api & {
  parsedPath: ParsedPath,
  changeCase: typeof changeCase,
}
