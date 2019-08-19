import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'
import { forOwn } from 'vtils'
import { Generator } from '../src/Generator'

const generatorFactory = (id: number | number[], typesOnly: boolean) => {
  const apiDir = tempy.directory()
  return new Generator({
    serverUrl: 'http://foo.bar',
    typesOnly: typesOnly,
    prodEnvName: 'production',
    outputFilePath: path.join(apiDir, 'index.ts'),
    requestFunctionFilePath: path.join(apiDir, 'request.ts'),
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
  test('正确生成代码并写入文件 - 单分类', async () => {
    const generator = generatorFactory(58, false)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot('接口文件')
      expect(fs.readFileSync(requestFilePath).toString()).toMatchSnapshot('请求文件')
    })
  })

  test('正确生成代码并写入文件 - 多分类', async () => {
    const generator = generatorFactory([58, 113], false)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot('接口文件')
      expect(fs.readFileSync(requestFilePath).toString()).toMatchSnapshot('请求文件')
    })
  })

  test('正确生成代码并写入文件 - 全部分类', async () => {
    const generator = generatorFactory(0, false)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot('接口文件')
      expect(fs.readFileSync(requestFilePath).toString()).toMatchSnapshot('请求文件')
    })
  })

  test('只生成类型代码并写入文件', async () => {
    const generator = generatorFactory(58, true)
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot('接口文件')
      expect(fs.existsSync(requestFilePath)).toBe(false)
    })
  })
})
