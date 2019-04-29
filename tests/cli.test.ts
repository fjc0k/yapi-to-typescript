import fs from 'fs-extra'
import path from 'path'
import { sleep } from 'vtils'

const targetDir = path.join(__dirname, '.tmpTest')
const generatedConfigFile = path.join(targetDir, 'ytt.config.ts')
const generatedApiFile = path.join(targetDir, '/src/api/index.ts')
const generatedRequestFile = path.join(targetDir, '/src/api/request.ts')

describe('cli', () => {
  test('正确初始化配置文件 & 生成结果', async () => {
    fs.ensureDirSync(targetDir)
    process.chdir(targetDir)

    process.argv[2] = 'init'
    await import('../src/cli')
    await sleep(2000)
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
    await sleep(2000)
    expect(fs.readFileSync(generatedApiFile).toString()).toMatchSnapshot()
    expect(fs.readFileSync(generatedRequestFile).toString()).toMatchSnapshot()
    fs.removeSync(targetDir)
  })
})
