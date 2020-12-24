#!/usr/bin/env node
import * as TSNode from 'ts-node'
import consola from 'consola'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompt from 'prompts'
import { Config, ServerConfig } from './types'
import { dedent } from 'vtils'
import { Defined } from 'vtils/types'
import { Generator } from './Generator'

TSNode.register({
  // 不加载本地的 tsconfig.json
  skipProject: true,
  // 仅转译，不做类型检查
  transpileOnly: true,
  // 自定义编译选项
  compilerOptions: {
    strict: false,
    target: 'es2017',
    module: 'commonjs',
    moduleResolution: 'node',
    declaration: false,
    removeComments: false,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    importHelpers: false,
    // 转换 js，支持在 ytt.config.js 里使用最新语法
    allowJs: true,
    lib: ['es2017'],
  },
})

export async function run(
  /* istanbul ignore next */
  cwd: string = process.cwd(),
) {
  const configTSFile = path.join(cwd, 'ytt.config.ts')
  const configJSFile = path.join(cwd, 'ytt.config.js')
  const configTSFileExist = await fs.pathExists(configTSFile)
  const configJSFileExist =
    !configTSFileExist && (await fs.pathExists(configJSFile))
  const configFileExist = configTSFileExist || configJSFileExist
  const configFile = configTSFileExist ? configTSFile : configJSFile

  const cmd = process.argv[2]

  if (cmd === 'help') {
    console.log(
      `\n${dedent`
        # 用法
          初始化配置文件: ytt init
          生成代码: ytt
          查看帮助: ytt help

        # GitHub
          https://github.com/fjc0k/yapi-to-typescript
      `}\n`,
    )
  } else if (cmd === 'init') {
    if (configFileExist) {
      consola.info(`检测到配置文件: ${configFile}`)
      const answers = await prompt({
        message: '是否覆盖已有配置文件?',
        name: 'override',
        type: 'confirm',
      })
      if (!answers.override) return
    }
    const answers = await prompt({
      message: '选择配置文件类型?',
      name: 'configFileType',
      type: 'select',
      choices: [
        { title: 'TypeScript(ytt.config.ts)', value: 'ts' },
        { title: 'JavaScript(ytt.config.js)', value: 'js' },
      ],
    })
    await fs.outputFile(
      answers.configFileType === 'js' ? configJSFile : configTSFile,
      dedent`
        import { defineConfig } from 'yapi-to-typescript'

        export default defineConfig([
          {
            serverUrl: 'http://foo.bar',
            typesOnly: false,
            target: '${(answers.configFileType === 'js'
              ? 'javascript'
              : 'typescript') as Defined<ServerConfig['target']>}',
            reactHooks: {
              enabled: false,
            },
            prodEnvName: 'production',
            outputFilePath: 'src/api/index.${answers.configFileType}',
            requestFunctionFilePath: 'src/api/request.${
              answers.configFileType
            }',
            dataKey: 'data',
            projects: [
              {
                token: 'hello',
                categories: [
                  {
                    id: 0,
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
        ])
      `,
    )
    consola.success('写入配置文件完毕')
  } else {
    if (!configFileExist) {
      return consola.error(`找不到配置文件: ${configTSFile} 或 ${configJSFile}`)
    }
    consola.success(`找到配置文件: ${configFile}`)
    let generator: Generator | undefined
    let spinner: ora.Ora | undefined
    try {
      const config: Config = require(configFile).default
      generator = new Generator(config, { cwd })

      spinner = ora('正在获取数据并生成代码...').start()
      await generator.prepare()
      const output = await generator.generate()
      spinner.stop()
      consola.success('获取数据并生成代码完毕')

      await generator.write(output)
      consola.success('写入文件完毕')
      await generator.destroy()
    } catch (err) {
      spinner?.stop()
      await generator?.destroy()
      /* istanbul ignore next */
      return consola.error(err)
    }
  }
}

/* istanbul ignore next */
if (require.main === module) {
  run()
}
