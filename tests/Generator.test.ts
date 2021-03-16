import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'
import { forOwn } from 'vtils'
import { Generator } from '../src/Generator'
import { OneOrMore } from 'vtils/types'
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
  jsonSchema,
  onlyMatchPath,
  noUpdateTimeComment,
}: {
  id: OneOrMore<0 | 82 | 87 | 151 | -82 | -87 | -151>
  typesOnly?: boolean
  enableReactHooks?: boolean
  target?: ServerConfig['target']
  token?: string | string[]
  jsonSchema?: ServerConfig['jsonSchema']
  onlyMatchPath?: RegExp
  noUpdateTimeComment?: ServerConfig['noUpdateTimeComment']
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
    jsonSchema: jsonSchema,
    noUpdateTimeComment: noUpdateTimeComment,
    projects: [
      {
        token: token,
        categories: [
          {
            id: id,
            preproccessInterface(ii) {
              ii.path += '_test'
              return onlyMatchPath
                ? onlyMatchPath.test(ii.path)
                  ? ii
                  : false
                : ii
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
    await generator.prepare()
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
    await generator.prepare()
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
    await generator.prepare()
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
    await generator.prepare()
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
    await generator.prepare()
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
    await generator.prepare()
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
    await generator.prepare()
    await generator.generate()
    expect(require('got').getExportCount()).toEqual(1)
  })

  test('生成 JavaScript 代码', async () => {
    const generator = generatorFactory({
      id: 0,
      target: 'javascript',
    })
    await generator.prepare()
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
    await generator.prepare()
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
    await generator.prepare()
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

  test('生成请求数据和返回数据的 JSON Schema', async () => {
    const generator = generatorFactory({
      id: 82,
      jsonSchema: {
        enabled: true,
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, (_, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
    })
  })

  test('只生成请求数据的 JSON Schema', async () => {
    const generator = generatorFactory({
      id: 82,
      jsonSchema: {
        enabled: true,
        responseData: false,
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, (_, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
    })
  })

  test('只生成返回数据的 JSON Schema', async () => {
    const generator = generatorFactory({
      id: 82,
      jsonSchema: {
        enabled: true,
        requestData: false,
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, (_, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
    })
  })

  test('排除接口', async () => {
    const generator = generatorFactory({
      id: 0,
      onlyMatchPath: /delete/,
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, (_, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
    })
  })

  test('无更新时间注释', async () => {
    const generator = generatorFactory({
      id: 82,
      noUpdateTimeComment: true,
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })

    await generator.write(output)
    forOwn(output, (_, outputFilePath) => {
      expect(fs.readFileSync(outputFilePath).toString()).toMatchSnapshot(
        '接口文件',
      )
    })
  })
})
