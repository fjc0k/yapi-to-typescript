import fetch from 'cross-fetch'
import { RequestBodyType, RequestFunctionParams } from 'yapi-to-typescript'

export interface RequestOptions {
  /**
   * 是否返回 Blob 结果，适用某些返回文件流的接口。
   */
  returnBlob?: boolean
}

export enum RequestErrorType {
  NetworkError = 'NetworkError',
  StatusError = 'StatusError',
  BusinessError = 'BusinessError',
}

export class RequestError extends Error {
  constructor(
    public type: RequestErrorType,
    public message: any,
    public httpStatusOrBusinessCode: number = 0,
  ) {
    super(message instanceof Error ? message.message : String(message))
  }
}

export default async function request<TResponseData>(
  payload: RequestFunctionParams,
  options?: RequestOptions,
): Promise<TResponseData> {
  try {
    // 基础 URL，可以从载荷中拉取或者写死
    const baseUrl = payload.prodUrl

    // 完整 URL
    const url = `${baseUrl}${payload.path}`

    // fetch 选项
    const fetchOptions: RequestInit = {
      method: payload.method,
      headers: {
        ...(payload.hasFileData
          ? {}
          : payload.requestBodyType === RequestBodyType.json
          ? { 'Content-Type': 'application/json; charset=UTF-8' }
          : payload.requestBodyType === RequestBodyType.form
          ? {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
            }
          : {}),
      },
      body: payload.hasFileData
        ? payload.getFormData()
        : payload.requestBodyType === RequestBodyType.json
        ? JSON.stringify(payload.data)
        : payload.requestBodyType === RequestBodyType.form
        ? Object.keys(payload.data)
            .filter(key => payload.data[key] != null)
            .map(
              key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  payload.data[key],
                )}`,
            )
            .join('&')
        : undefined,
    }

    // 发起请求
    const [fetchErr, fetchRes] = await fetch(url, fetchOptions).then<
      [
        // 如果遇到网络故障，fetch 将会 reject 一个 TypeError 对象
        TypeError,
        Response,
      ]
    >(
      res => [null, res] as any,
      err => [err, null] as any,
    )

    // 网络错误
    if (fetchErr) {
      throw new RequestError(RequestErrorType.NetworkError, fetchErr)
    }

    // 状态错误
    if (fetchRes.status < 200 || fetchRes.status >= 300) {
      throw new RequestError(
        RequestErrorType.StatusError,
        `${fetchRes.status}: ${fetchRes.statusText}`,
        fetchRes.status,
      )
    }

    // 请求结果处理
    const res = options?.returnBlob
      ? await fetchRes.blob()
      : (fetchRes.headers.get('Content-Type') || '').indexOf(
          'application/json',
        ) >= 0
      ? await fetchRes
          .json()
          // 解析 JSON 报错时给个空对象作为默认值
          .catch(() => ({}))
      : await fetchRes.text()

    // 业务错误
    // 假设 code 为 0 时表示请求成功，其他表示请求失败，同时 msg 表示错误信息
    if (
      res != null &&
      typeof res === 'object' &&
      res.code != null &&
      res.code !== 0
    ) {
      throw new RequestError(RequestErrorType.BusinessError, res.msg, res.code)
    }

    // 适配 dataKey，取出 data
    const data: TResponseData =
      res != null &&
      typeof res === 'object' &&
      payload.dataKey != null &&
      res[payload.dataKey] != null
        ? res[payload.dataKey]
        : res

    return data
  } catch (err: unknown) {
    // 重试函数
    const retry = () => request<TResponseData>(payload, options)
    if (err instanceof RequestError) {
      // 网络错误处理
      if (err.type === RequestErrorType.NetworkError) {
        // 此处可弹窗说明原因：err.message，最好也提供重试操作，下面以原生 confirm 为例，建议替换为项目中使用到的弹窗组件
        const isRetry = confirm(`网络错误：${err.message}，是否重试？`)
        if (isRetry) {
          return retry()
        }
        throw err
      }

      // 状态错误处理
      else if (err.type === RequestErrorType.StatusError) {
        // 用户未登录处理
        if (err.httpStatusOrBusinessCode === 401) {
          // 推荐在此处发起登录逻辑
        }
      }

      // 业务错误处理
      else if (err.type === RequestErrorType.BusinessError) {
        // 推荐弹个轻提示说明错误原因：err.message
        throw err
      }
    } else {
      throw err
    }
  }
}
