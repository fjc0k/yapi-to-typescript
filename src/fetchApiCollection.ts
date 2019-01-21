import rawRequest from 'request-promise-native'
import cookie from 'cookie'
import { ApiCollection, Config } from './types'

type LoginResult = {
  errcode: number,
  errmsg: string,
  data: any,
}

export default async function fetchApiCollection(config: Config): Promise<ApiCollection> {
  const [, baseUrl, projectId] = config.projectUrl.match(/(.+\/)project\/(\d+)\//)

  const loginUrl = `${baseUrl}api/user/${config.login.method === 'ldap' ? 'login_by_ldap' : 'login'}`
  const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`

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

  const loginResult: LoginResult = await request.post(loginUrl, {
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

  const apiCollection: ApiCollection = await request.get(apiUrl)

  return apiCollection
}
