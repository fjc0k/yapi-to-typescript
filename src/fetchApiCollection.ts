import request from 'superagent'
import { ApiCollection, Config } from './types'

export default async function fetchApiCollection(config: Config): Promise<ApiCollection> {
  const [, baseUrl, projectId] = config.projectUrl.match(/(.+\/)project\/(\d+)\//)
  const loginUrl = `${baseUrl}api/user/${config.loginMethod === 'ldap' ? 'login_by_ldap' : 'login'}`
  const agent = request.agent()
  const { body: loginResult } = await agent.post(loginUrl).send({ email: config.email, password: config.password }) as { body: { errcode: number, errmsg: string } }
  if (!loginResult || loginResult.errcode !== 0) {
    throw new Error(`\x1b[31m登录 ${loginUrl} 失败，请检查邮箱、密码是否有误或服务是否可用。（服务器错误信息：${loginResult.errmsg}）\x1b[0m`)
  }
  const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`
  const { body: api } = await agent.get(apiUrl).buffer() as { body: Buffer }
  return JSON.parse(api.toString()) as any
}
