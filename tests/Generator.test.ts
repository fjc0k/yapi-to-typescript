import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'
import { forOwn } from 'vtils'
import { Generator } from '../src/Generator'
import { OneOrMany } from 'vtils/types'
import { ServerConfig } from '../src'

afterEach(() => {
  require('got').resetExportCount()
})

const generatorFactory = ({
  id,
  typesOnly = false,
  enableReactHooks = false,
  target = 'typescript',
  token = 'hello',
}: {
  id: OneOrMany<0 | 82 | 87 | 151 | -82 | -87 | -151>
  typesOnly?: boolean
  enableReactHooks?: boolean
  target?: ServerConfig['target']
  token?: string | string[]
}) => {
  const apiDir = tempy.directory()
  return new Generator({
    serverUrl: 'http://foo.bar',
    typesOnly: typesOnly,
    target: target,
    prodEnvName: 'production',
    outputFilePath: path.join(apiDir, 'index.ts'),
    requestFunctionFilePath: path.join(apiDir, 'request.ts'),
    reactHooks: {
      enabled: enableReactHooks,
    },
    projects: [
      {
        token: token,
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
    const generator = generatorFactory({
      id: 82,
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  })

  test('正确生成代码并写入文件 - 多分类', async () => {
    const generator = generatorFactory({
      id: [82, 87],
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  })

  test('正确生成代码并写入文件 - 全部分类', async () => {
    const generator = generatorFactory({
      id: 0,
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  })

  test('正确生成代码并写入文件 - 排除分类', async () => {
    const generator = generatorFactory({
      id: [0, -82],
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  })

  test('只生成类型代码并写入文件', async () => {
    const generator = generatorFactory({
      id: 82,
      typesOnly: true,
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(fs.existsSync(requestFunctionFilePath)).toBe(false)
    })
  })

  test('生成 React Hooks 代码', async () => {
    const generator = generatorFactory({
      id: 82,
      enableReactHooks: true,
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(
      output,
      (
        { requestFunctionFilePath, requestHookMakerFilePath },
        outputFilePath,
      ) => {
        expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
          '接口文件',
        )
        expect(
          fs.readFileSync(requestFunctionFilePath).toString(),
        ).toMatchSnapshot('请求文件')
        expect(
          fs.readFileSync(requestHookMakerFilePath).toString(),
        ).toMatchSnapshot('Hook 生成文件')
      },
    )
  })

  test('同一个项目导出接口列表 API 应只请求一次', async () => {
    const generator = generatorFactory({
      id: 0,
    })
    await generator.generate()
    expect(require('got').getExportCount()).toEqual(1)
  })

  test('生成 JavaScript 代码', async () => {
    const generator = generatorFactory({
      id: 0,
      target: 'javascript',
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.existsSync(`${outputFilePath}`)).toBe(false)
      expect(fs.existsSync(`${requestFunctionFilePath}`)).toBe(false)
      outputFilePath = `${outputFilePath}`.replace(/\.ts(x)?$/, '.js$1')
      requestFunctionFilePath = `${requestFunctionFilePath}`.replace(
        /\.ts(x)?$/,
        '.js$1',
      )
      expect(fs.existsSync(`${outputFilePath}`)).toBe(true)
      expect(fs.existsSync(`${requestFunctionFilePath}`)).toBe(true)
      expect(
        fs.existsSync(`${outputFilePath.replace(/\.[^.]+$/, '.d.ts')}`),
      ).toBe(true)
      expect(
        fs.existsSync(
          `${requestFunctionFilePath.replace(/\.[^.]+$/, '.d.ts')}`,
        ),
      ).toBe(true)
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  }, 30000)

  test('支持项目设置里的接口基本路径', async () => {
    const generator = generatorFactory({
      id: 82,
      token: 'with-basepath',
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  })

  test('支持将 token 设为数组', async () => {
    const generator = generatorFactory({
      id: 82,
      token: ['projectA', 'projectB'],
    })
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, ({ requestFunctionFilePath }, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
      expect(
        fs.readFileSync(requestFunctionFilePath).toString(),
      ).toMatchSnapshot('请求文件')
    })
  })
})
