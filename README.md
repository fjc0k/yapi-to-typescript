> 这里是 v1 版本的文档，v0 版本的文档见：[yapi-to-typescript/tree/v0](https://github.com/fjc0k/yapi-to-typescript/tree/v0#yapi-to-typescript--)

<p align="center">
  <img src="https://raw.githubusercontent.com/fjc0k/yapi-to-typescript/master/assets/logo.png" width="150" />
</p>

# YApi to TypeScript [![Build Status](https://travis-ci.org/fjc0k/yapi-to-typescript.svg?branch=master)](https://travis-ci.org/fjc0k/yapi-to-typescript) [![codecov](https://codecov.io/gh/fjc0k/yapi-to-typescript/branch/master/graph/badge.svg)](https://codecov.io/gh/fjc0k/yapi-to-typescript)

根据 [YApi](https://github.com/YMFE/yapi) 的接口定义生成 [TypeScript](https://github.com/Microsoft/TypeScript) 的接口类型及其请求函数代码。

<img src="https://raw.githubusercontent.com/fjc0k/yapi-to-typescript/master/assets/preview.png?vvv=13322" width="600" />


## 环境要求

- `Node >= 8`
- `YApi >= 1.5.12`

## 特性

- 支持多服务器、多项目、多分类
- 支持预处理接口信息
- 可自定义类型或函数名称
- 完整的注释

## 安装

```bash
# yarn
yarn add yapi-to-typescript

# 或者，npm
npm i yapi-to-typescript --save
```

## 使用

`yapi-to-typescript` 基于当前目录下的 `ytt.config.ts` 配置文件进行相关操作。

### 生成配置文件

使用命令 `ytt init` 可在当前目录自动创建配置文件 `ytt.config.ts`，如果配置文件已存在，将会询问你是否覆盖：

```bash
# yarn
yarn ytt init

# 或者，npm
npm run ytt init
```

### 修改配置文件

打开当前目录下的 `ytt.config.ts` 配置文件，直接修改即可。[查看配置说明](http://fjc0k.github.io/yapi-to-typescript/interfaces/serverconfig.html)

### 生成 TypeScript 的接口类型及其请求函数代码

直接执行命令 `ytt` 即可抓取 `YApi` 的接口定义并生成相应的 `TypeScript` 代码：

```bash
# yarn
yarn ytt

# 或者，npm
npm run ytt
```

## 配置

### 概论

从实质上而言，配置就是一个服务器列表，各个服务器又包含一个项目列表，各个项目下都有一个分类列表，其类型大致如此：

```ts
type Servers = Array<{
  projects: Array<{
    categories: Array<{
      // ...
    }>
  }>
}>

// 配置实质是一个服务器列表
type Config = Servers
```

因此，你可分别在 `服务器级别`、`项目级别`、`分类级别` 进行相关配置，如果不同级别存在相同的配置项，低级别的配置项会覆盖高级别的配置项，也就是说：

- 如果存在相同的配置项，`分类级别` 的配置会覆盖 `项目级别`、 `服务器级别` 的配置项；
- 如果存在相同的配置项，`项目级别` 的配置会覆盖 `服务器级别` 的配置项。

### 配置项

具体配置项见：[API 文档](http://fjc0k.github.io/yapi-to-typescript/interfaces/serverconfig.html)。

## 许可

MIT @ Jay Fong
