import request from 'superagent'
import { ApiCollection, Config } from './types'

export default async function fetchApiCollection(config: Config): Promise<ApiCollection> {
  const [, baseUrl, projectId] = config.projectUrl.match(/(.+\/)project\/(\d+)\//)
  const loginUrl = `${baseUrl}api/user/login`
  const agent = request.agent()
  const { body: loginResult } = await agent.post(loginUrl).send({ email: config.email, password: config.password }) as { body: { errcode: number } }
  if (!loginResult || loginResult.errcode !== 0) {
    throw new Error(`登录 ${loginUrl} 失败，请检查邮箱、密码是否有误或服务是否可用。`)
  }
  const apiUrl = `${baseUrl}api/plugin/export?type=json&pid=${projectId}&status=all&isWiki=false`
  const { body: api } = await agent.get(apiUrl).buffer() as { body: Buffer }
  return JSON.parse(api.toString()) as any
}
