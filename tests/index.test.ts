import path from 'path'
import fs from 'fs-extra'
import ytt from '../src'
import { InterfaceType } from '../src/types'

const tmpDir = path.join(__dirname, '.tmp1')
const targetFile = path.join(tmpDir, 'api/index.ts')
const requestFile = path.join(tmpDir, 'api/request.ts')

beforeAll(() => {
  fs.ensureDirSync(tmpDir)
})

afterAll(() => {
  fs.removeSync(tmpDir)
})

test('成功', async () => {
  await ytt({
    projectUrl: 'http://foo.bar/project/20/interface/api',
    email: 'hello@x.xx',
    password: 'correctPassword',
    targetFile: targetFile,
    categories: {
      58: {
        getInterfaceName({ changeCase, parsedPath }, interfaceType) {
          return changeCase.camelCase(parsedPath.name) + (interfaceType === InterfaceType.Request ? 'Request' : 'Response')
        },
        getRequestFunctionName({ changeCase, parsedPath }) {
          return changeCase.camelCase(parsedPath.name)
        },
      },
    },
  })
  expect(fs.readFileSync(targetFile).toString()).toMatchSnapshot()
  expect(fs.readFileSync(requestFile).toString()).toMatchSnapshot()
})
