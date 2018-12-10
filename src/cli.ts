#!/usr/bin/env node

require('ts-node').register({ transpileOnly: true })

import fs from 'fs-extra'
import cli from 'commander'
import pkg from '../package.json'
import { Config } from './types'
import toTypeScript from './index'

const cwd = process.cwd()

const configTsFile = `${cwd}/ytt.config.ts`
const configJsFile = `${cwd}/ytt.config.js`

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
            // 登录 YApi 的邮箱
            email: 'hello@foo.bar',
            // 登录 YApi 的密码
            password: '123456',
            // 生成的 TypeScript 文件路径
            targetFile: 'src/api.ts',
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
        `.trim().replace(/ {10}/g, '')}\n`)
        break
      default:
        let config: Config = {} as any
        switch (true) {
          case fs.existsSync(configTsFile):
            config = require(configTsFile).default
            break
          case fs.existsSync(configJsFile):
            config = require(configJsFile)
            break
          default:
            throw new Error('请先设置 ytt.config.{ts|js} 文件。')
        }
        (async () => {
          await toTypeScript(config)
        })()
        break
    }
  })
  .parse(process.argv)
