import path from 'path'
import fs from 'fs-extra'
import { pascalCase } from 'change-case'
import { Config, ApiList, InterfaceType } from './types'
import fetchApiCollection from './fetchApiCollection'
import generateRequestPayloadType from './generateRequestPayloadType'
import generateResponsePayloadType from './generateResponsePayloadType'

export default async (config: Config): Promise<void> => {
  const apiCollection = await fetchApiCollection(config)
  const categoryIdToApiList = apiCollection.reduce((res, api) => {
    if (api.list.length) {
      res[api.list[0].catid] = api.list
    }
    return res
  }, {} as { [key: number]: ApiList })
  const tsContent = (
    await Promise.all(
      Object.keys(config.categories).map(async (categoryId: any) => {
        const { getRequestFunctionName, getInterfaceName } = config.categories[categoryId]
        return Promise.all(
          categoryIdToApiList[categoryId].map(async api => {
            const requestDataInterfaceName = pascalCase(getInterfaceName(api, InterfaceType.Request))
            const responseDataInterfaceName = pascalCase(getInterfaceName(api, InterfaceType.Response))
            const requestPayloadType = (await generateRequestPayloadType(api, requestDataInterfaceName)).trim()
            const responsePayloadType = (await generateResponsePayloadType(api, responseDataInterfaceName, config.dataKey)).trim()
            return [
              `/**\n * **请求类型**：${api.title}\n */\n${requestPayloadType}`,
              `/**\n * **响应类型**：${api.title}\n */\n${responsePayloadType}`,
              `/**\n * ${api.title}\n */\nexport function ${getRequestFunctionName(api)}(data${/(\{\}|any)$/s.test(requestPayloadType) ? '?' : ''}: ${requestDataInterfaceName}): Promise<${responseDataInterfaceName}> {\n${
                [
                  `  return request({`,
                  `    path: '${api.path}',`,
                  `    method: '${api.method}',`,
                  `    requestBodyType: '${api.req_body_type}',`,
                  `    responseBodyType: '${api.res_body_type}',`,
                  `    data: data`,
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
  fs.outputFileSync(path.resolve(process.cwd(), config.targetFile), [
    `/* tslint:disable */\n/* eslint-disable */`,
    `import request from './request'`,
    `import FileData from 'yapi-to-typescript/lib/FileData'`,
    tsContent,
  ].join('\n\n'))
  console.log(tsContent)
}
