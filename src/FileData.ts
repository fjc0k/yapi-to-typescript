export default class FileData<T = any> {
  private content: T

  /**
   * 创建一个文件数据。
   *
   * @param content 文件内容，依平台而不同，如 web 上为 File 实例，微信小程序里是文件路径字符串
   */
  public constructor(content: T) {
    this.content = content
  }

  /**
   * 获取文件内容。
   *
   * @returns 文件内容
   */
  public get(): T {
    return this.content
  }
}
