import path from 'path'
import fs from 'fs-extra'
import * as changeCase from 'change-case'
import consola from 'consola'
import { Config, ApiList, InterfaceType, ExtendedApi } from './types'
import fetchApiCollection from './fetchApiCollection'
import generateRequestPayloadType from './generateRequestPayloadType'
import generateResponsePayloadType from './generateResponsePayloadType'

export default async (config: Config): Promise<void> => {
  consola.info('获取接口 JSON 文件中...')
  // 获取接口的 JSON 文件并转换为对象
  const apiCollection = await fetchApiCollection(config)
  consola.info('生成 TypeScript 类型文件中...')
  // 生成分类 ID 到分类 API 列表的对象
  const categoryIdToApiList = apiCollection.reduce<{ [id: number]: ApiList }>((res, api) => {
    if (api.list.length) {
      res[api.list[0].catid] = api.list
    }
    return res
  }, {})
  const tsContent = (
    await Promise.all(
      Object.keys(config.categories).map(async (categoryId: any) => {
        const { getRequestFunctionName, getInterfaceName } = config.categories[categoryId]
        return Promise.all(
          categoryIdToApiList[categoryId].map(async api => {
            const extendedApi: ExtendedApi = {
              ...api,
              parsedPath: path.parse(api.path),
              changeCase: changeCase,
            }
            const requestDataInterfaceName = changeCase.pascalCase(getInterfaceName(extendedApi, InterfaceType.Request))
            const responseDataInterfaceName = changeCase.pascalCase(getInterfaceName(extendedApi, InterfaceType.Response))
            const requestPayloadType = (await generateRequestPayloadType(api, requestDataInterfaceName)).trim()
            const responsePayloadType = (await generateResponsePayloadType(api, responseDataInterfaceName, config.dataKey)).trim()
            return [
              `/**\n * **请求类型**：${api.title}\n */\n${requestPayloadType}`,
              `/**\n * **响应类型**：${api.title}\n */\n${responsePayloadType}`,
              `/**\n * ${api.title}\n */\nexport function ${getRequestFunctionName(extendedApi)}(requestData${/(\{\}|any)$/s.test(requestPayloadType) ? '?' : ''}: ${requestDataInterfaceName}): Promise<${responseDataInterfaceName}> {\n${
                [
                  `  const { data, fileData } = parseRequestData(requestData)`,
                  `  return request({`,
                  `    path: '${api.path}',`,
                  `    method: '${api.method}',`,
                  `    requestBodyType: '${api.req_body_type}',`,
                  `    responseBodyType: '${api.res_body_type}',`,
                  `    data: data,`,
                  `    fileData: fileData`,
                  `  } as any)`,
                ].join('\n')
              }\n}`,
            ].join('\n\n')
          })
        )
      })
    )
  )
    .reduce((res, arr) => {
      res.push(...arr)
      return res
    }, [])
    .join('\n\n')
  const targetFile = path.resolve(process.cwd(), config.targetFile)
  const requestFile = path.join(path.parse(targetFile).dir, 'request.ts')
  if (!fs.existsSync(requestFile)) {
    fs.outputFileSync(requestFile, `${`
      import { RequestPayload } from 'yapi-to-typescript/lib/types'

      export default function request({
        path,
        method,
        requestBodyType,
        responseBodyType,
        data,
        fileData
      }: RequestPayload): Promise<any> {
        return new Promise((resolve, reject) => {
          // 是否含有文件数据
          const hasFileData = fileData !== null

          // 在这里实现请求逻辑
        })
      }
    `.trim().replace(/ {6}/g, '')}\n`)
  }
  fs.outputFileSync(targetFile, [
    `/* tslint:disable */\n/* eslint-disable */`,
    `import request from './request'`,
    `// @ts-ignore\nimport { FileData, parseRequestData } from 'yapi-to-typescript/lib/utils'`,
    tsContent,
  ].join('\n\n'))
  consola.success(`操作完成.`)
}
