import path from 'path'
import fs from 'fs-extra'
import { run } from '../src/cliCore'

const tmpDir = path.join(__dirname, '.tmp2')
const yttConfigFile = path.join(tmpDir, 'ytt.config.ts')
const targetFile = path.join(tmpDir, 'api/index.ts')
const cwd = process.cwd()

beforeEach(() => {
  fs.ensureDirSync(tmpDir)
  process.chdir(tmpDir)
})

afterEach(() => {
  process.chdir(cwd)
  fs.removeSync(tmpDir)
})

test('初始化成功', async () => {
  process.argv.push('init')
  await run()
  expect(fs.readFileSync(yttConfigFile).toString()).toMatchSnapshot()
})

test('没有配置文件时报错', async () => {
  process.argv.pop()
  await expect(run()).rejects.toThrowErrorMatchingSnapshot()
})

test('生成 API 成功', async () => {
  fs.writeFileSync(yttConfigFile, `
    export default {
      projectUrl: 'http://foo.bar/project/20/interface/api',
      email: 'hello@x.xx',
      password: 'correctPassword',
      targetFile: ${JSON.stringify(targetFile)},
      categories: {
        58: {
          getInterfaceName({ changeCase, parsedPath }: any, interfaceType: any) {
            return changeCase.camelCase(parsedPath.name) + interfaceType
          },
          getRequestFunctionName({ changeCase, parsedPath }: any) {
            return changeCase.camelCase(parsedPath.name)
          },
        },
      },
    }
  `)
  await run()
  expect(fs.existsSync(targetFile)).toBeTruthy()
})
