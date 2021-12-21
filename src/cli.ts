#!/usr/bin/env node
import * as TSNode from 'ts-node'
import consola from 'consola'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import prompt from 'prompts'
import yargs from 'yargs'
import { Config, ServerConfig } from './types'
import { dedent, wait } from 'vtils'
import { Defined } from 'vtils/types'
import { Generator } from './Generator'
import { renderTemplate } from './utils'

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
  cmd: string | undefined,
  options?: {
    configFile?: string
  },
) {
  let useCustomConfigFile = false
  let cwd!: string
  let configTSFile!: string
  let configJSFile!: string
  let configFile!: string
  let configFileExist!: boolean

  if (!options?.configFile) {
    cwd = process.cwd()
    configTSFile = path.join(cwd, 'ytt.config.ts')
    configJSFile = path.join(cwd, 'ytt.config.js')
    const configTSFileExist = await fs.pathExists(configTSFile)
    const configJSFileExist =
      !configTSFileExist && (await fs.pathExists(configJSFile))
    configFileExist = configTSFileExist || configJSFileExist
    configFile = configTSFileExist ? configTSFile : configJSFile
  } else {
    useCustomConfigFile = true
    configFile = options.configFile
    cwd = path.dirname(configFile)
    configFileExist = await fs.pathExists(configFile)
  }

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
    let outputConfigFile!: string
    let outputConfigFileType!: 'ts' | 'js'
    if (useCustomConfigFile) {
      outputConfigFile = configFile
      outputConfigFileType = configFile.endsWith('.js') ? 'js' : 'ts'
    } else {
      const answers = await prompt({
        message: '选择配置文件类型?',
        name: 'configFileType',
        type: 'select',
        choices: [
          { title: 'TypeScript(ytt.config.ts)', value: 'ts' },
          { title: 'JavaScript(ytt.config.js)', value: 'js' },
        ],
      })
      outputConfigFile =
        answers.configFileType === 'js' ? configJSFile : configTSFile
      outputConfigFileType = answers.configFileType
    }
    const configFileContent = await renderTemplate<{
      target: Defined<ServerConfig['target']>
      ext: string
    }>(path.join(__dirname, './templates/ytt.config.ts'), {
      target: outputConfigFileType === 'ts' ? 'typescript' : 'javascript',
      ext: outputConfigFileType,
    })
    await fs.outputFile(outputConfigFile, configFileContent)
    consola.success('写入配置文件完毕')
  } else {
    if (!configFileExist) {
      return consola.error(
        `找不到配置文件: ${
          useCustomConfigFile
            ? configFile
            : `${configTSFile} 或 ${configJSFile}`
        }`,
      )
    }
    consola.success(`找到配置文件: ${configFile}`)
    let generator: Generator | undefined
    let spinner: ora.Ora | undefined
    try {
      const config: Config = require(configFile).default
      generator = new Generator(config, { cwd })

      spinner = ora('正在获取数据并生成代码...').start()
      const delayNotice = wait(5000)
      delayNotice.then(() => {
        spinner!.text = `正在获取数据并生成代码... (若长时间处于此状态，请检查是否有接口定义的数据过大导致拉取或解析缓慢)`
      })
      await generator.prepare()
      delayNotice.cancel()

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
  const argv = yargs(process.argv).alias('c', 'config').argv
  run(argv._[2] as any, {
    configFile: argv.config
      ? path.resolve(process.cwd(), argv.config as string)
      : undefined,
  })
}
