<p align="center">
  <img src="./logo.svg" width="250" />
</p>


# yapi-to-typescript

根据 [YApi](https://github.com/YMFE/yapi) 的接口定义生成 [TypeScript](https://github.com/Microsoft/TypeScript) 的请求函数。


## 安装

```bash
# yarn
yarn add yapi-to-typescript -D

# 或者，npm
npm i yapi-to-typescript -D
```

## 使用

`yapi-to-typescript` 安装完成后，我们就可以使用 `ytt` 命令进行相关操作。

### 生成配置文件

在使用前，我们应该在项目的根目录写入配置文件 `ytt.config.ts`，使用命令 `ytt init` 可快速创建配置文件，如果配置文件已存在，将会被覆盖：

```bash
# yarn
yarn ytt init

# 或者，npm
npm run ytt init
```

### 修改配置文件

打开 `ytt.config.ts`，按照说明修改相关配置项即可。[查看配置说明](#配置项)

### 生成 TypeScript 定义文件

直接执行命令 `ytt` 即可抓取 YApi 的接口定义并生成相应的 TypeScript 定义文件：

```bash
# yarn
yarn ytt

# 或者，npm
npm run ytt
```

### 建议

因为 API 接口在开发过程中是不断变化的，建议你将 `ytt` 命令放入 `package.json` 的 `scripts` 字段中：

```json
{
  "scripts": {
    "api": "ytt"
  }
}
```

然后更新 API 的 TypeScript 定义只需执行以下命令即可：

```bash
# yarn
yarn api

# 或者，npm
npm run api
```


## 配置项

- **projectUrl**
  - 类型: `string`
  - 说明: 项目全部接口页面的 url。
  - 举例: `http://foo.bar/project/20/interface/api`

- **email**
  - 类型: `string`
  - 说明: 登录 YApi 的邮箱。
  - 举例: `hello@foo.bar`

- **password**
  - 类型: `string`
  - 说明: 登录 YApi 的密码。
  - 举例: `123456`

- **targetFile**
  - 类型: `string`
  - 说明: 生成的 TypeScript 文件路径。
  - 举例: `src/api/index.ts`

- **dataKey**
  - 类型: `string`
  - 说明: 若接口返回的是类似 `{ code: number, msg: string, data: any }` 这种数据，往往我们只需要 `data`，这时我们可设置 `dataKey` 为 `data`，则接口函数返回的就是 `data` 的值。
  - 举例: `data`

- **categories**
  - 类型:
    ```ts
    {
      /** 分类 id */
      [id: number]: {
        /** 获取发起请求函数的名称 */
        getRequestFunctionName: (api: ExtendedApi) => string,
        /** 获取 ts 接口的名称 */
        getInterfaceName: (api: ExtendedApi, interfaceType: InterfaceType) => string,
      },
    }
    ```
  - 说明: 要获取的分类列表，键为分类 ID，值为一个包含相关操作的对象。
  - 举例:
    ```ts
    {
      // 键是分类 ID，
      // 比如有接口分类的 url 为：http://foo.bar/project/20/interface/api/cat_55，
      // 则其 ID 为 55
      55: {
        // 下面的配置结果示例：
        // export function getUserInfo(data: GetUserInfoRequest): Promise<GetUserInfoResponse> { ... }
        // 获取接口名称，这里的接口指 TypeScript 中的 interface，非 api 接口
        getInterfaceName({ changeCase, parsedPath }, interfaceType) {
          const PascalName = changeCase.pascalCase(parsedPath.name)
          return \`\${PascalName}\${interfaceType === InterfaceType.Request ? 'Request' : 'Response'}\`
        },
        // 获取 api 接口函数名称
        getRequestFunctionName({ changeCase, parsedPath }) {
          return changeCase.camelCase(parsedPath.name)
        },
      },
    }
    ```
