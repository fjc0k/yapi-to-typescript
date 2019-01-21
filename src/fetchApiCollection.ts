import request from 'superagent'
import { ApiCollection, Config } from './types'

type LoginResult = {
  body: {
    errcode: number,
    errmsg: string,
  },
}
type ApiResult = { body: Buffer }

export default async function fetchApiCollection(config: Config): Promise<ApiCollection> {
  const [, baseUrl, projectId] = config.projectUrl.match(/(.+\/)project\/(\d+)\//)

  const loginUrl = `${baseUrl}api/user/${config.login.method === 'ldap' ? 'login_by_ldap' : 'login'}`
  const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`

  const agent = request.agent()

  if (config.extraCookies) {
    (agent as any).set('Cookie', config.extraCookies)
  }

  const { body: loginResult } = await agent
    .post(loginUrl)
    .send({
      email: config.login.email,
      password: config.login.password,
    }) as LoginResult
  if (!loginResult || loginResult.errcode !== 0) {
    throw new Error(
      `\x1b[31m登录 ${loginUrl} 失败，请检查邮箱、密码是否有误或服务是否可用。（服务器错误信息：${loginResult.errmsg}）\x1b[0m`
    )
  }

  const { body: api } = await agent.get(apiUrl).buffer() as ApiResult

  return JSON.parse(api.toString()) as any
}
