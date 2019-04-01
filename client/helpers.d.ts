export declare class FileData<T = any> {
    /**
     * 原始文件数据。
     */
    private originalFileData;
    /**
     * 文件数据辅助类，统一网页、小程序等平台的文件上传。
     *
     * @param originalFileData 原始文件数据
     */
    constructor(originalFileData: T);
    /**
     * 获取原始文件数据。
     *
     * @returns 原始文件数据
     */
    getOriginalFileData(): T;
}
/**
 * 解析请求数据，从请求数据中分离出普通数据和文件数据。
 *
 * @param requestData 要解析的请求数据
 * @returns 包含普通数据(data)和文件数据(fileData)的对象，data、fileData 为空对象时，表示没有此类数据
 */
export declare function parseRequestData<RD extends {
    [key: string]: any;
}, DK extends {
    [K in keyof RD]: RD[K] extends FileData ? never : K;
}[keyof RD], FDK extends {
    [K in keyof RD]: RD[K] extends FileData ? K : never;
}[keyof RD]>(requestData: RD): {
    data: {
        [K in DK]: RD[K];
    };
    fileData: {
        [K in FDK]: RD[K] extends FileData<infer T> ? T : any;
    };
};
