import fs from 'fs-extra'
import path from 'path'
import { forOwn, wait } from 'vtils'
import { Generator } from '../src/Generator'

const apiDir = path.join(__dirname, '../api')

const generatorFactory = (id: number | number[], typesOnly: boolean) => {
  return new Generator({
    serverUrl: 'http://foo.bar',
    typesOnly,
    prodEnvName: 'production',
    outputFilePath: 'api/index.ts',
    requestFunctionFilePath: 'api/request.ts',
    projects: [
      {
        token: 'hello',
        categories: [
          {
            id: id,
            preproccessInterface(ii) {
              ii.path += '_test'
              return ii
            },
            getRequestFunctionName(ii, cc) {
              return cc.camelCase(ii.parsedPath.name)
            },
            getRequestDataTypeName(ii, cc) {
              return `${cc.pascalCase(ii.parsedPath.name)}Request`
            },
            getResponseDataTypeName(ii, cc) {
              return `${cc.pascalCase(ii.parsedPath.name)}Response`
            },
          },
        ],
      },
    ],
  })
}

describe('Generator', () => {
  beforeEach(() => {
    fs.ensureDirSync(apiDir)
    fs.emptyDirSync(apiDir)
  })

  afterEach(() => {
    fs.removeSync(apiDir)
  })

  test('正确生成代码并写入文件 - 单分类', async () => {
    const generator = generatorFactory(58, false)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot()
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot()
      expect(fs.readFileSync(requestFilePath).toString()).toMatchSnapshot()
    })
  })

  test('正确生成代码并写入文件 - 多分类', async () => {
    // 解决 ci 不通过
    await wait(500)

    const generator = generatorFactory([58, 113], false)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot()
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot()
      expect(fs.readFileSync(requestFilePath).toString()).toMatchSnapshot()
    })
  })

  test('正确生成代码并写入文件 - 全部分类', async () => {
    // 解决 ci 不通过
    await wait(500)

    const generator = generatorFactory(0, false)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot()
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot()
      expect(fs.readFileSync(requestFilePath).toString()).toMatchSnapshot()
    })
  })

  test('只生成类型代码并写入文件', async () => {
    // 解决 ci 不通过
    await wait(500)

    const generator = generatorFactory(58, true)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot()
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot()
      expect(fs.existsSync(requestFilePath)).toBe(false)
    })
  })
})
