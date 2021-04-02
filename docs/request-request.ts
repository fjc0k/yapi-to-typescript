// import fetch from 'cross-fetch'
import { RequestBodyType, RequestFunctionParams } from 'yapi-to-typescript'

declare const wx: any
declare const qq: any
declare const my: any
declare const jd: any
declare const swan: any
declare const tt: any
declare const dd: any

const mp =
  typeof wx !== 'undefined'
    ? wx
    : typeof qq !== 'undefined'
    ? qq
    : typeof my !== 'undefined'
    ? my
    : typeof jd !== 'undefined'
    ? jd
    : typeof swan !== 'undefined'
    ? swan
    : typeof tt !== 'undefined'
    ? tt
    : typeof dd !== 'undefined'
    ? dd
    : undefined

export interface RequestOptions {
  /**
   * 是否返回 Blob 结果，适用某些返回文件流的接口。
   */
  returnBlob?: boolean
}

export default async function request<TResponseData>(
  payload: RequestFunctionParams,
  options?: RequestOptions,
): Promise<TResponseData> {
  // 基础 URL，可以从载荷中拉取或者写死
  const baseUrl = payload.prodUrl

  // 完整 URL
  const url = `${baseUrl}${payload.path}`

  // request 选项
  let requestOptions!: Record<string, any>
  if (payload.hasFileData) {
    const firstFileKey = Object.keys(payload.fileData)[0]
    requestOptions = {
      url: url,
      filePath: payload.fileData[firstFileKey],
      name: firstFileKey,
      header: {},
      formData: payload.data,
      timeout: 6000,
    }
  } else {
    requestOptions = {
      url: url,
      method: payload.method,
      header: {
        ...(payload.requestBodyType === RequestBodyType.json
          ? { 'Content-Type': 'application/json; charset=UTF-8' }
          : payload.requestBodyType === RequestBodyType.form
          ? {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
            }
          : {}),
      },
      data:
        payload.requestBodyType === RequestBodyType.json
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
      responseType: 'arraybuffer',
      dataType: 'arraybuffer',
      timeout: 6000,
    }
  }

  // 发起请求
  const [fetchErr, fetchRes] = await new Promise((resolve, reject) => {
    mp[payload.hasFileData ? 'uploadFile' : 'request']({
      ...requestOptions,
      success: resolve,
      fail: reject,
    })
  }).then<
    [
      // 如果遇到网络故障，fetch 将会 reject 一个 TypeError 对象
      TypeError,
      Response,
    ]
  >(
    res => [null, res] as any,
    err => [err, null] as any,
  )

  // 网络错误处理
  if (fetchErr) {
    throw fetchErr
  }

  // 接口错误处理
  if (fetchRes.status < 200 || fetchRes.status >= 300) {
    throw new Error(`${fetchRes.status}: ${fetchRes.statusText}`)
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

  // 业务错误处理
  // 假设 code 为 0 时表示请求成功，其他表示请求失败，同时 msg 表示错误信息
  if (
    res != null &&
    typeof res === 'object' &&
    res.code != null &&
    res.code !== 0
  ) {
    throw new Error(res.msg)
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
}
