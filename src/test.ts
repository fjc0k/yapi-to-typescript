import { Generator } from './Generator'

const generator = new Generator({
  serverUrl: 'http://127.0.0.1:3000',
  prodEnvName: 'production',
  outputFilePath: './yy/__api.ts',
  requestFunctionFilePath: './fff/dd/r.ts',
  projects: [
    {
      token: '2e2bea1b54b46d74a17882aeef01674f452738f43acba9d2551f7113b40ab04b',
      categories: [
        {
          id: 11,
          preproccessInterface(ii) {
            ii.path = `/v2${ii.path}`
            return ii
          },
          getRequestFunctionName(ii) {
            return ii.parsedPath.name
          },
          getRequestDataTypeName(ii) {
            return `${ii.changeCase.pascalCase(ii.parsedPath.name)}Request`
          },
          getResponseDataTypeName(ii) {
            return `${ii.changeCase.pascalCase(ii.parsedPath.name)}Response`
          },
        },
      ],
    },
  ],
})

generator.generate()
