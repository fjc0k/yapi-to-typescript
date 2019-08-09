import fs from 'fs-extra'
import path from 'path'
import { wait } from 'vtils'

const targetDir = path.join(__dirname, '.tmpTest')
const generatedConfigFile = path.join(targetDir, 'ytt.config.ts')
const generatedApiFile = path.join(targetDir, '/src/api/index.ts')
const generatedRequestFile = path.join(targetDir, '/src/api/request.ts')

beforeAll(() => {
  fs.ensureDirSync(targetDir)
  fs.emptyDirSync(targetDir)
})

afterAll(() => {
  fs.removeSync(targetDir)
})

describe('cli', () => {
  test('正确初始化配置文件 & 生成结果', async () => {
    process.chdir(targetDir)

    process.argv[2] = 'init'
    await import('../src/cli')
    await wait(500)
    expect(fs.readFileSync(generatedConfigFile).toString()).toMatchSnapshot()

    jest.resetModules()
    process.argv[2] = ''
    fs.writeFileSync(
      generatedConfigFile,
      fs.readFileSync(generatedConfigFile).toString()
        .replace('yapi-to-typescript', '../../src')
        .replace(`dataKey: 'data',`, '')
        .replace(`id: 50,`, `id: 58,`),
    )
    await import('../src/cli')
    await wait(1000)
    expect(fs.readFileSync(generatedApiFile).toString()).toMatchSnapshot()
    expect(fs.readFileSync(generatedRequestFile).toString()).toMatchSnapshot()
  })

  test('检查到已有配置，可以选择覆盖', async () => {
    process.chdir(targetDir)

    process.argv[2] = 'init'
    await import('../src/cli')
    await wait(500)
    fs.writeFileSync(generatedConfigFile, 'error data')

    jest.resetModules()
    jest.mock('prompts')

    require('prompts').setAnswer(true)
    process.argv[2] = 'init'
    await import('../src/cli')
    await wait(500)
    expect(fs.readFileSync(generatedConfigFile).toString()).toMatchSnapshot()
  })

  test('检查到已有配置，选择不做任何操作', async () => {
    process.chdir(targetDir)

    process.argv[2] = 'init'
    await import('../src/cli')
    await wait(500)
    fs.writeFileSync(generatedConfigFile, 'error data')

    jest.resetModules()
    jest.mock('prompts')

    require('prompts').setAnswer(false)
    process.argv[2] = 'init'
    await import('../src/cli')
    await wait(500)
    expect(fs.readFileSync(generatedConfigFile).toString()).toBe('error data')
  })
})
