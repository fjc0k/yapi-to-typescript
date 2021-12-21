import { defineConfig } from 'yapi-to-typescript'

export default defineConfig([
  {
    serverUrl: 'http://foo.bar',
    typesOnly: false,
    // @ts-ignore remove
    target: '__TARGET__',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'production',
    outputFilePath: 'src/api/index.__EXT__',
    requestFunctionFilePath: 'src/api/request.__EXT__',
    dataKey: 'data',
    projects: [
      {
        token: 'hello',
        categories: [
          {
            id: 0,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(interfaceInfo.path)

              // 若生成的请求函数名存在语法关键词报错、或想通过某个关键词触发 IDE 自动引入提示，可考虑加前缀，如:
              // return changeCase.camelCase(`api_${interfaceInfo.path}`)

              // 若生成的请求函数名有重复报错，可考虑将接口请求方式纳入生成条件，如:
              // return changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.path}`)
            },
          },
        ],
      },
    ],
  },
])
