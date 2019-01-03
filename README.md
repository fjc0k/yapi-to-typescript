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

