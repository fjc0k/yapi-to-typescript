require('ts-node').register({ transpileOnly: true })

import fs from 'fs-extra'
import cli from 'commander'
import { Config } from './types'
import toTypeScript from './index'

export async function run(): Promise<void> {
  return new Promise((resolve, reject) => {
    const cwd = process.cwd()
    const pkg = require('../package.json')

    const configTsFile = `${cwd}/ytt.config.ts`

    cli
      .version(pkg.version)
      .arguments('[cmd]')
      .action(cmd => {
        switch (cmd) {
          case 'init':
            fs.outputFileSync(configTsFile, `${`
              import { Config, InterfaceType } from 'yapi-to-typescript/lib/types'

              const config: Config = {
                // 项目全部接口页面的 url
                projectUrl: 'http://foo.bar/project/20/interface/api',
                // 登录信息
                login: {
                  // 登录方式：classical（普通登录）、ldap（LDAP）
                  method: 'classical',
                  // 登录邮箱
                  email: 'hello@foo.bar',
                  // 登录密码
                  password: '123456',
                },
                /**
                // openapi 方式登录，yapi 版本大于等于 1.5.0 时推荐使用
                login: {
                  method: 'openapi',
                  token: '项目的token, 进入项目的设置-->token配置获取',
                },
                */
                // 随请求发送的其他 Cookie，一般情况下不必理会
                // 如：a=1; b=2
                extraCookies: '',
                // 生成的 TypeScript 文件路径，
                // 同时，如果同级目录下不存在 \`request.ts\` 文件，
                // 执行 \`ytt\` 时则会自动创建一个默认的 \`request.ts\` 文件
                targetFile: 'src/api/index.ts',
                // 若接口返回的是类似 { code: number, msg: string, data: any } 这种数据，
                // 往往我们只需要 data，这时我们可设置 dataKey 为 data，
                // 则接口函数返回的就是 data 的值
                dataKey: '',
                // 接口分类
                categories: {
                  // 键是分类 ID，
                  // 比如有接口分类的 url 为：http://foo.bar/project/20/interface/api/cat_55，
                  // 则其 ID 为 55
                  55: {
                    // 下面的配置结果示例：
                    // export function getUserInfo(data: GetUserInfoRequest): Promise<GetUserInfoResponse> { ... }
                    // 获取接口名称，这里的接口指 TypeScript 中的 interface，非 api 接口
                    getInterfaceName({ changeCase, parsedPath }, interfaceType) {
                      const PascalName = changeCase.pascalCase(parsedPath.name)
                      return \`\${PascalName}\${interfaceType === InterfaceType.Request ? 'Request' : 'Response'}\`
                    },
                    // 获取 api 接口函数名称
                    getRequestFunctionName({ changeCase, parsedPath }) {
                      return changeCase.camelCase(parsedPath.name)
                    },
                  },
                },
              }

              export default config
            `.trim().replace(/ {14}/g, '')}\n`)
            resolve()
            break
          default:
            let config: Config = {} as any
            switch (true) {
              case fs.existsSync(configTsFile):
                config = require(configTsFile).default
                break
              default:
                reject(new Error('请先设置 ytt.config.ts 文件。'))
                return
            }
            toTypeScript(config).then(resolve, reject)
            break
        }
      })
      .parse(process.argv)
  })
}
