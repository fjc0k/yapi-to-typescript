#!/usr/bin/env node
import * as TSNode from 'ts-node'
import cli from 'commander'
import consola from 'consola'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompt from 'prompts'
import { CliConfig } from './types'
import { Generator } from './Generator'

TSNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
})

;(async () => {
  const pkg = require('../package.json')
  const configFile = path.join(process.cwd(), 'ytt.config.ts')

  cli
    .version(pkg.version)
    .arguments('[cmd]')
    .allowUnknownOption()
    .action(async cmd => {
      switch (cmd) {
        case 'init':
          if (await fs.pathExists(configFile)) {
            consola.info(`检测到配置文件: ${configFile}`)
            const answers = await prompt({
              type: 'confirm',
              name: 'override',
              message: '是否覆盖已有配置文件?',
            })
            if (!answers.override) return
          }
          await fs.outputFile(configFile, `${`
            import { CliConfig } from 'yapi-to-typescript'

            const cliConfig: CliConfig = {
              typesOnly: false,
              serverConfigs: [
                {
                  serverUrl: 'http://foo.bar',
                  prodEnvName: 'production',
                  outputFilePath: 'src/api/index.ts',
                  requestFunctionFilePath: 'src/api/request.ts',
                  dataKey: 'data',
                  projects: [
                    {
                      token: 'hello',
                      categories: [
                        {
                          id: 50,
                          getRequestFunctionName(interfaceInfo, changeCase) {
                            return changeCase.camelCase(
                              interfaceInfo.parsedPath.name,
                            )
                          },
                        },
                      ],
                    },
                  ],
                },
              ]
            }

            export default cliConfig
          `.replace(/^ {12}/mg, '').trim()}\n`)
          consola.success('写入配置文件完毕')
          break
        default:
          if (!await fs.pathExists(configFile)) {
            return consola.error(`找不到配置文件: ${configFile}`)
          }
          consola.success(`找到配置文件: ${configFile}`)
          try {
            const cliConfig: CliConfig = require(configFile).default
            const generator = new Generator(cliConfig)

            const spinner = ora('正在获取数据并生成代码...').start()
            const output = await generator.generate()
            spinner.stop()
            consola.success('获取数据并生成代码完毕')

            await generator.write(output)
            consola.success('写入文件完毕')
          } catch (err) {
            return consola.error(err)
          }
          break
      }
    })
    .parse(process.argv)
})()
