import rawRequest from 'request-promise-native'
import cookie from 'cookie'
import { ApiCollection, Config, Api } from './types'

type ApiResult<T = any> = {
  errcode: number,
  errmsg: string,
  data: T,
}

export default async function fetchApiCollection(config: Config): Promise<ApiCollection> {
  const [
    ,
    // 基础 URL
    baseUrl,
    // 项目 ID
    projectId,
  ] = config.projectUrl.match(/(.+\/)project\/(\d+)\//)

  // 设置 request
  const cookieJar = rawRequest.jar()
  if (config.extraCookies) {
    const cookies = cookie.parse(config.extraCookies)
    Object.keys(cookies).forEach(key => {
      cookieJar.setCookie(`${key}=${cookies[key]}`, baseUrl)
    })
  }
  const request = rawRequest.defaults({
    jar: cookieJar,
    json: true,
  })

  let apiCollection: ApiCollection

  if (config.login.method === 'openapi') {
    const { token } = config.login
    const catListUrl = `${baseUrl}api/interface/list_menu?token=${token}`
    const catListResult: ApiResult<ApiCollection> = await request.get(catListUrl)

    if (!catListResult || catListResult.errcode !== 0) {
      throw new Error(
        `\x1b[31mopenapi 请求失败，请确认 YApi 的版本是否大于或等于 1.5.0，以及 token 是否正确。（服务器错误信息：${catListResult.errmsg}）\x1b[0m`
      )
    }

    const catIds = Object.keys(config.categories).map(Number)

    apiCollection = await Promise.all(
      catListResult.data
        .filter(cat => cat.list.length && catIds.includes(cat.list[0].catid))
        .map(async cat => {
          cat.list = await Promise.all(
            cat.list.map(async item => {
              const apiDetailUrl = `${baseUrl}api/interface/get?id=${item._id}&token=${token}`
              const apiDetailResult: ApiResult<Api> = await request.get(apiDetailUrl)
              return apiDetailResult.data
            })
          )
          return cat
        })
    )
  } else {
    const loginUrl = `${baseUrl}api/user/${config.login.method === 'ldap' ? 'login_by_ldap' : 'login'}`
    const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`

    const loginResult: ApiResult = await request.post(loginUrl, {
      form: {
        email: config.login.email,
        password: config.login.password,
      },
    })

    if (!loginResult || loginResult.errcode !== 0) {
      throw new Error(
        `\x1b[31m登录 ${loginUrl} 失败，请检查邮箱、密码是否有误或服务是否可用。（服务器错误信息：${loginResult.errmsg}）\x1b[0m`
      )
    }

    apiCollection = await request.get(apiUrl)
  }

  return apiCollection
}
