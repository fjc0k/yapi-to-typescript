import { Config, Interface, InterfaceList } from './types';
export default class Generator {
    /** 配置 */
    private config;
    /** { 项目标识: 分类列表 } */
    private projectIdToCategoryList;
    constructor(config: Config);
    /** 生成请求数据类型 */
    static generateRequestDataType({ interfaceInfo, typeName }: {
        interfaceInfo: Interface;
        typeName: string;
    }): Promise<string>;
    /** 生成响应数据类型 */
    static generateResponseDataType({ interfaceInfo, typeName, dataKey }: {
        interfaceInfo: Interface;
        typeName: string;
        dataKey?: string;
    }): Promise<string>;
    /** 获取分类的接口列表 */
    fetchCategoryInterfaceList({ serverUrl, token, categoryId }: {
        serverUrl: string;
        token: string;
        categoryId: number;
    }): Promise<InterfaceList>;
}
