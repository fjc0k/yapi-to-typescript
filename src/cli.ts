#!/usr/bin/env node
import * as TSNode from 'ts-node'
import consola from 'consola'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompt from 'prompts'
import {Config} from './types'
import {dedent} from 'vtils'
import {Generator} from './Generator'

TSNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
})

export async function run(
  /* istanbul ignore next */
  cwd: string = process.cwd(),
) {
  const pkg = require('../package.json')
  const configFile = path.join(cwd, 'ytt.config.ts')
  const cmd = process.argv[2]

  if (cmd === 'version') {
    console.log(`${pkg.name} v${pkg.version}`)
  } else if (cmd === 'help') {
    console.log(`\n${dedent`
      # 用法
        初始化配置文件: ytt init
        生成代码: ytt
        查看版本: ytt version
        查看帮助: ytt help

      # GitHub
        https://github.com/fjc0k/yapi-to-typescript
    `}\n`)
  } else if (cmd === 'init') {
    if (await fs.pathExists(configFile)) {
      consola.info(`检测到配置文件: ${configFile}`)
      const answers = await prompt({
        type: 'confirm',
        name: 'override',
        message: '是否覆盖已有配置文件?',
      })
      if (!answers.override) return
    }
    await fs.outputFile(configFile, dedent`
      import { Config } from 'yapi-to-typescript'

      const config: Config = [
        {
          serverUrl: 'http://foo.bar',
          typesOnly: false,
          reactHooks: {
            enabled: false,
          },
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

      export default config
    `)
    consola.success('写入配置文件完毕')
  } else {
    if (!await fs.pathExists(configFile)) {
      return consola.error(`找不到配置文件: ${configFile}`)
    }
    consola.success(`找到配置文件: ${configFile}`)
    try {
      const config: Config = require(configFile).default
      const generator = new Generator(config, {cwd})

      const spinner = ora('正在获取数据并生成代码...').start()
      const output = await generator.generate()
      spinner.stop()
      consola.success('获取数据并生成代码完毕')

      await generator.write(output)
      consola.success('写入文件完毕')
    } catch (err) {
      /* istanbul ignore next */
      return consola.error(err)
    }
  }
}

/* istanbul ignore next */
if (require.main === module) {
  run()
}
