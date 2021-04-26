import consola from 'consola'
import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'
import { CatId } from './consts'
import { run } from '../src/cli'
import { wait } from 'vtils'

function getTempPaths() {
  const targetDir = tempy.directory()
  fs.symlinkSync(
    path.join(__dirname, '../node_modules'),
    path.join(targetDir, 'node_modules'),
    'dir',
  )
  const generatedConfigFile = path.join(targetDir, 'ytt.config.ts')
  const generatedApiFile = path.join(targetDir, 'src/api/index.ts')
  const generatedRequestFile = path.join(targetDir, 'src/api/request.ts')
  return {
    targetDir,
    generatedConfigFile,
    generatedApiFile,
    generatedRequestFile,
  }
}

async function runCli(cmd: string, configFile: string) {
  await run(cmd, {
    configFile,
  })
  await wait(100)
}

beforeEach(() => {
  require('prompts').setAnswer('configFileType', 'ts')
})

describe('cli', () => {
  test('help', async () => {
    const tempPaths = getTempPaths()

    let text = ''
    const log = jest.fn(message => {
      text = message
    })
    jest.spyOn(console, 'log').mockImplementationOnce(log)

    await runCli('help', tempPaths.generatedConfigFile)

    expect(text).toMatchSnapshot('help')
  })

  test('没有配置文件生成将会报错', async () => {
    const tempPaths = getTempPaths()
    const errorHandler = jest.fn()

    jest.spyOn(consola, 'error').mockImplementationOnce(errorHandler)

    await runCli('', tempPaths.generatedConfigFile)

    expect(errorHandler).toBeCalledTimes(1)
  })

  test('正确初始化配置文件 & 生成结果', async () => {
    const tempPaths = getTempPaths()

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile)
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('配置文件')

    // 生成结果
    fs.writeFileSync(
      tempPaths.generatedConfigFile,
      fs
        .readFileSync(tempPaths.generatedConfigFile)
        .toString()
        .replace('yapi-to-typescript', path.join(__dirname, '../src'))
        .replace(`dataKey: 'data',`, '')
        .replace(`id: 50,`, `id: ${CatId.test},`),
    )
    await runCli('', tempPaths.generatedConfigFile)
    expect(
      fs.readFileSync(tempPaths.generatedApiFile).toString(),
    ).toMatchSnapshot('接口文件')
    expect(
      fs.readFileSync(tempPaths.generatedRequestFile).toString(),
    ).toMatchSnapshot('请求文件')
  })

  test('检查到已有配置，可以选择覆盖', async () => {
    const tempPaths = getTempPaths()

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile)
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('配置文件')

    // 修改配置文件
    fs.writeFileSync(tempPaths.generatedConfigFile, 'hello')
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('修改过的配置文件')

    // 覆盖配置文件
    require('prompts').setAnswer('override', true)
    await runCli('init', tempPaths.generatedConfigFile)
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('覆盖后的配置文件')
  })

  test('检查到已有配置，可以选择不覆盖', async () => {
    const tempPaths = getTempPaths()

    // 初始化配置文件
    await runCli('init', tempPaths.generatedConfigFile)
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('配置文件')

    // 修改配置文件
    fs.writeFileSync(tempPaths.generatedConfigFile, 'hello')
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('修改过的配置文件')

    // 不覆盖配置文件
    require('prompts').setAnswer('override', false)
    await runCli('init', tempPaths.generatedConfigFile)
    await wait(1000)
    expect(
      fs.readFileSync(tempPaths.generatedConfigFile).toString(),
    ).toMatchSnapshot('不覆盖后的配置文件')
  })
})
