import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'
import { CatId } from './consts'
import { forOwn } from 'vtils'
import { Generator } from '../src/Generator'
import { OneOrMore } from 'vtils/types'
import { ServerConfig } from '../src'

afterEach(() => {
  require('node-fetch').resetExportCount()
})

const generatorFactory = ({
  id,
  typesOnly = false,
  enableReactHooks = false,
  target = 'typescript',
  token = 'hello',
  jsonSchema,
  onlyMatchPath,
  comment,
  outputFilePath,
  dataKey,
  preproccessInterface,
  customTypeMapping,
  setRequestFunctionExtraInfo,
}: {
  id: OneOrMore<
    | 0
    | CatId.test
    | CatId.test2
    | CatId.issues
    | CatId._test
    | CatId._test2
    | CatId._issues
  >
  typesOnly?: boolean
  enableReactHooks?: boolean
  target?: ServerConfig['target']
  token?: string | string[]
  jsonSchema?: ServerConfig['jsonSchema']
  onlyMatchPath?: RegExp
  comment?: ServerConfig['comment']
  outputFilePath?: (apiDir: string) => ServerConfig['outputFilePath']
  dataKey?: ServerConfig['dataKey']
  preproccessInterface?: ServerConfig['preproccessInterface']
  customTypeMapping?: ServerConfig['customTypeMapping']
  setRequestFunctionExtraInfo?: ServerConfig['setRequestFunctionExtraInfo']
}) => {
  const apiDir = tempy.directory()
  return new Generator({
    serverUrl: 'http://foo.bar',
    typesOnly: typesOnly,
    target: target,
    prodEnvName: 'production',
    outputFilePath: outputFilePath
      ? outputFilePath(apiDir)
      : path.join(apiDir, 'index.ts'),
    requestFunctionFilePath: path.join(apiDir, 'request.ts'),
    reactHooks: {
      enabled: enableReactHooks,
    },
    jsonSchema: jsonSchema,
    comment: comment,
    dataKey: dataKey,
    customTypeMapping: customTypeMapping,
    setRequestFunctionExtraInfo: setRequestFunctionExtraInfo,
    projects: [
      {
        token: token,
        categories: [
          {
            id: id,
            preproccessInterface(_ii, cc, config) {
              let ii = _ii
              if (preproccessInterface) {
                ii = preproccessInterface(ii, cc, config) as any
                if ((ii as any) === false) {
                  return false
                }
              }
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
      id: CatId.test,
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
      id: [CatId.test, CatId.test2],
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
      id: [0, CatId._test],
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
      id: CatId.test,
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
      id: CatId.test,
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
    expect(require('node-fetch').getExportCount()).toEqual(1)
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
      id: CatId.test,
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
      id: CatId.test,
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
      id: CatId.test,
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
      id: CatId.test,
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
      id: CatId.test,
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

  test('无注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        enabled: false,
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

  test('无更新时间注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        updateTime: false,
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

  test('无标题注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        title: false,
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

  test('无分类注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        category: false,
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

  test('无标签注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        tag: false,
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

  test('无请求头注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        requestHeader: false,
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

  test('无链接注释', async () => {
    const generator = generatorFactory({
      id: CatId.test,
      comment: {
        link: false,
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

  test('outputFilePath 可以是函数', async () => {
    const generator = generatorFactory({
      id: [CatId.test2, CatId.issues],
      outputFilePath: apiDir => interfaceInfo =>
        path.join(apiDir, `${interfaceInfo._category.name}.ts`),
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('dataKey 使用正常', async () => {
    const generator = generatorFactory({
      id: [CatId.test],
      dataKey: 'data',
      preproccessInterface: ii => {
        if (ii.title === 'dataKey 例子') {
          return ii
        }
        return false
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('dataKey 深度使用正常', async () => {
    const generator = generatorFactory({
      id: [CatId.test],
      dataKey: ['container', 'data', 'realData'],
      preproccessInterface: ii => {
        if (ii.title === 'dataKey 深度路径') {
          return ii
        }
        return false
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('comment.extraTags 使用正常', async () => {
    const generator = generatorFactory({
      id: [CatId.test2],
      comment: {
        extraTags: ii => [
          {
            name: '状态',
            value: ii.status === 'done' ? '已完成' : '未完成',
            position: 'start',
          },
          {
            name: '项目ID',
            value: ii.project_id.toString(),
          },
        ],
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('customTypeMapping 使用正常', async () => {
    const generator = generatorFactory({
      id: [CatId.test2],
      customTypeMapping: {
        string: 'boolean',
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('setRequestFunctionExtraInfo 使用正常', async () => {
    const generator = generatorFactory({
      id: [CatId.test2],
      setRequestFunctionExtraInfo: ii => ({
        name: ii.title,
        category: ii._category.name,
        project: ii._project.name,
      }),
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('可获取接口、分类、项目在 YApi 上的地址', async () => {
    const generator = generatorFactory({
      id: [CatId.test2],
      setRequestFunctionExtraInfo: ii => ({
        url: ii._url,
        categoryUrl: ii._category._url,
        projectUrl: ii._project._url,
      }),
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }, outputFilePath) => {
      expect(path.basename(outputFilePath)).toMatchSnapshot('输出路径')
      expect(content).toMatchSnapshot('输出内容')
    })
  })

  test('生成的 JSON Schema 应包含默认值', async () => {
    const generator = generatorFactory({
      id: CatId.test2,
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

  test('preproccessInterface 里可获取作用于当前接口的配置', async () => {
    const generator = generatorFactory({
      id: CatId.test2,
      dataKey: '__data__',
      preproccessInterface(ii, cc, config) {
        ii.path += `/${config.dataKey}`
        return ii
      },
    })
    await generator.prepare()
    const output = await generator.generate()
    forOwn(output, ({ content }) => {
      expect(content).toMatchSnapshot('输出内容')
    })
  })
})
