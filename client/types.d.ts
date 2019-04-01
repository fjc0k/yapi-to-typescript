/// <reference types="node" />
import * as changeCase from 'change-case';
import { JSONSchema4 } from 'json-schema';
import { ParsedPath } from 'path';
/** 请求方式 */
export declare enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    PATCH = "PATCH"
}
/** 是否必需 */
export declare enum Required {
    /** 不必需 */
    false = "0",
    /** 必需 */
    true = "1"
}
/** 请求数据类型 */
export declare enum RequestBodyType {
    /** 查询字符串 */
    query = "query",
    /** 表单 */
    form = "form",
    /** JSON */
    json = "json",
    /** 纯文本 */
    text = "text",
    /** 文件 */
    file = "file",
    /** 原始数据 */
    raw = "raw"
}
/** 请求表单条目类型 */
export declare enum RequestFormItemType {
    /** 纯文本 */
    text = "text",
    /** 文件 */
    file = "file"
}
/** 返回数据类型 */
export declare enum ResponseBodyType {
    /** JSON */
    json = "json",
    /** 纯文本 */
    text = "text",
    /** XML */
    xml = "xml",
    /** 原始数据 */
    raw = "raw",
    /** JSON Schema */
    jsonSchema = "json-schema"
}
/** 接口定义 */
export interface Interface {
    /** 接口 ID */
    _id: number;
    /** 接口名称 */
    title: string;
    /** 接口备注 */
    markdown: string;
    /** 请求路径 */
    path: string;
    /** 请求方式，HEAD、OPTIONS 处理与 GET 相似，其余处理与 POST 相似 */
    method: Method;
    /** 所属分类 id */
    catid: number;
    /** 仅 GET：请求串 */
    req_query: Array<{
        /** 名称 */
        name: string;
        /** 备注 */
        desc: string;
        /** 示例 */
        example: string;
        /** 是否必需 */
        required: Required;
    }>;
    /** 仅 POST：请求内容类型。为 text, file, raw 时不必特殊处理。 */
    req_body_type: RequestBodyType;
    /** `req_body_type = json` 时是否为 json schema */
    req_body_is_json_schema: boolean;
    /** `req_body_type = form` 时的请求内容 */
    req_body_form: Array<{
        /** 名称 */
        name: string;
        /** 类型 */
        type: RequestFormItemType;
        /** 备注 */
        desc: string;
        /** 示例 */
        example: string;
        /** 是否必需 */
        required: Required;
    }>;
    /** `req_body_type = json` 时的请求内容 */
    req_body_other: string;
    /** 返回数据类型 */
    res_body_type: ResponseBodyType;
    /** `res_body_type = json` 时是否为 json schema */
    res_body_is_json_schema: boolean;
    /** 返回数据 */
    res_body: string;
}
/** 扩展接口定义 */
export interface ExtendedInterface extends Interface {
    parsedPath: ParsedPath;
    changeCase: typeof changeCase;
}
/** 接口列表 */
export declare type InterfaceList = Interface[];
/** 分类信息 */
export interface Category {
    /** 分类名称 */
    name: string;
    /** 分类备注 */
    desc: string;
    /** 分类接口列表 */
    list: InterfaceList;
}
/** 分类列表，对应数据导出的 json 内容 */
export declare type CategoryList = Category[];
/**
 * 配置。
 */
export interface Config {
    /**
     * YApi 服务地址。
     *
     * @example 'http://yapi.foo.bar'
     */
    serverUrl?: string;
    /**
     * 生产环境名称。
     *
     * **用于获取生产环境域名。**
     *
     * 获取方式：打开项目 --> `设置` --> `环境配置` --> 点开或新增生产环境 --> 复制生产环境名称。
     *
     * @example 'prod'
     */
    prodEnvName?: string;
    /**
     * 输出文件路径。
     *
     * 可以是 `相对路径` 或 `绝对路径`。
     *
     * @example 'src/api/index.ts'
     */
    outputFilePath?: string;
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
    dataKey?: string;
    /**
     * 项目列表。
     */
    projects: Array<Pick<Config, 'serverUrl' | 'prodEnvName' | 'outputFilePath' | 'dataKey'> & {
        /**
         * 项目的唯一标识。
         *
         * 获取方式：打开项目 --> `设置` --> `token配置` --> 复制 token。
         *
         * @example 'e02a47122259d0c1973a9ff81cabb30685d64abc72f39edaa1ac6b6a792a647d'
         */
        token: string;
        /**
         * 分类列表。
         */
        categories: Array<Pick<Config, 'prodEnvName' | 'outputFilePath' | 'dataKey'> & {
            /**
             * 分类 ID。
             *
             * 获取方式：打开项目 --> 点开分类 --> 复制浏览器地址栏 `/api/cat_` 后面的数字。
             *
             * @example 20
             */
            id: number;
            /**
             * 获取请求函数的名称。
             *
             * @param interfaceInfo 接口信息
             * @returns 请求函数的名称
             */
            getRequestFunctionName(interfaceInfo: ExtendedInterface): string;
            /**
             * 获取请求数据类型的名称。
             *
             * @param interfaceInfo 接口信息
             * @returns 请求数据类型的名称
             */
            getRequestDataTypeName(interfaceInfo: ExtendedInterface): string;
            /**
             * 获取响应数据类型的名称。
             *
             * @param interfaceInfo 接口信息
             * @returns 响应数据类型的名称
             */
            getResponseDataTypeName(interfaceInfo: ExtendedInterface): string;
        }>;
    }>;
}
/**
 * 请求参数。
 */
export interface RequestFunctionParams {
    /** 接口 Mock 地址，结尾无 `/` */
    mockUrl: string;
    /** 接口生产环境地址，结尾无 `/` */
    prodUrl: string;
    /** 接口路径，以 `/` 开头 */
    path: string;
    /** 请求方法 */
    method: Method;
    /** 请求数据类型 */
    requestBodyType: RequestBodyType;
    /** 返回数据类型 */
    responseBodyType: ResponseBodyType;
    /** 请求数据，不含文件数据 */
    data: any;
    /** 请求文件数据 */
    fileData: Record<string, any>;
}
/**
 * 请求函数。
 *
 * 发起请求获得响应结果后应根据 `responseBodyType` 对结果进行处理并将处理后的数据原样返回。
 */
export declare type RequestFunction = (
/** 参数 */
params: RequestFunctionParams) => Promise<any>;
/** 属性定义 */
export interface PropDefinition {
    /** 属性名称 */
    name: string;
    /** 是否必需 */
    required: boolean;
    /** 类型 */
    type: JSONSchema4['type'];
    /** 注释 */
    comment: string;
}
/** 属性定义列表 */
export declare type PropDefinitions = PropDefinition[];
