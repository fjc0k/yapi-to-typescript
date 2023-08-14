# 更新日志

### [3.37.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.37.0...v3.37.1) (2023-08-14)

### 修复

- 锁定 swagger-client 版本为 3.18.4（其 3.19.0 版本后依赖了 tree-sitter 这些需要本地编译的包） ([1f96f2f](https://github.com/fjc0k/yapi-to-typescript/commit/1f96f2f6bf0eadffe0ed1b925a8d4ece30259926))

## [3.37.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.36.0...v3.37.0) (2023-02-08)

### 特性

- 表单支持多文件 ([#80](https://github.com/fjc0k/yapi-to-typescript/issues/80)) ([51f477b](https://github.com/fjc0k/yapi-to-typescript/commit/51f477b7854a3334875b8ccb766cdaf378c91cba))

### 文档

- 更新入群二维码 ([4aedd98](https://github.com/fjc0k/yapi-to-typescript/commit/4aedd9861ad8f96015b8a4cfb1f8580941f18415))

## [3.36.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.35.0...v3.36.0) (2022-11-17)

### 特性

- 网络请求出错时打印请求地址、请求参数方便排查 ([043a083](https://github.com/fjc0k/yapi-to-typescript/commit/043a083d2b81759320bf9cd53cda2c05978ea91e))

## [3.35.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.34.1...v3.35.0) (2022-09-20)

### 特性

- 支持通过环境变量(http_proxy 等)设置请求代理 ([d0064cc](https://github.com/fjc0k/yapi-to-typescript/commit/d0064cc12d89db06dc2bbc246c4c780eaffc431a))

### [3.34.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.34.0...v3.34.1) (2022-07-11)

### 修复

- 替换内部请求库为 node-fetch ([f3e9ea4](https://github.com/fjc0k/yapi-to-typescript/commit/f3e9ea46036523a82da098c3b2260f973905d2ab))

## [3.34.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.33.2...v3.34.0) (2022-03-23)

### 特性

- 新增 queryStringArrayFormat 配置项支持配置查询字符串数组格式化方式 (close: [#71](https://github.com/fjc0k/yapi-to-typescript/issues/71)) ([485d6ed](https://github.com/fjc0k/yapi-to-typescript/commit/485d6edc50aff7a1ec7bd5d6176fb4c807b1afbc))

### [3.33.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.33.1...v3.33.2) (2022-03-18)

### 修复

- 生成的代码使用 import type 引入类型 ([8af92e6](https://github.com/fjc0k/yapi-to-typescript/commit/8af92e64a259413e84b967c6af89de5552ad0643))

### [3.33.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.33.0...v3.33.1) (2022-03-14)

### 修复

- **类型引用:** 修复引用根级类型报错的问题 ([d8e93d4](https://github.com/fjc0k/yapi-to-typescript/commit/d8e93d48fe6a1b4403802d1c5365f89f506a0832))

## [3.33.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.32.1...v3.33.0) (2022-03-12)

### 特性

- 支持在备注栏定义类型引用以兼容没有标题栏的 YApi 低版本 ([25bd32b](https://github.com/fjc0k/yapi-to-typescript/commit/25bd32b2167be446f64abc71429d687df4798234))

### [3.32.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.32.0...v3.32.1) (2022-03-12)

### 修复

- 解决 Windows 下类型引用错误的问题 ([5eb3644](https://github.com/fjc0k/yapi-to-typescript/commit/5eb3644f0963af25c60e6f1e2828868610a8f066))
- 修复 cli 测试在 Windows 上无法执行的问题 ([717e936](https://github.com/fjc0k/yapi-to-typescript/commit/717e9366388c8571ec75baabb3115d77120757fa))

## [3.32.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.31.2...v3.32.0) (2022-02-26)

### 特性

- 支持定义引用类型以满足需要复用类型的场景 ([d022db1](https://github.com/fjc0k/yapi-to-typescript/commit/d022db1fe09feddcdee563491f1417d99465c5c3))

### [3.31.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.31.1...v3.31.2) (2022-02-16)

### 修复

- 自写 mockjs 模板解析引擎提升解析精确度 ([254f0e1](https://github.com/fjc0k/yapi-to-typescript/commit/254f0e1d64059cb9f8ea5466ddcbd3f7ea727051))

### [3.31.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.31.0...v3.31.1) (2022-02-15)

### 修复

- 对于数组类型的值, 应始终取其第一个条目的类型作为该数组的类型 ([e84d523](https://github.com/fjc0k/yapi-to-typescript/commit/e84d5239fdd474b30635055184b680bcb3e06875))

## [3.31.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.30.3...v3.31.0) (2022-02-11)

### 特性

- 新增命令行钩子，可在生成成功、失败、完毕时进行相关操作 (close: [#70](https://github.com/fjc0k/yapi-to-typescript/issues/70)) ([c7a6b6f](https://github.com/fjc0k/yapi-to-typescript/commit/c7a6b6f6d6d95055c3ba58e7822a9a1d82c73d1a))
- 支持在 preproccessInterface 里获取作用于当前接口的配置（通过第 3 个传参）(close: [#69](https://github.com/fjc0k/yapi-to-typescript/issues/69)) ([cf20043](https://github.com/fjc0k/yapi-to-typescript/commit/cf20043a6dc34537598e6b5bfbd63d2fc7901fc2))

### [3.30.3](https://github.com/fjc0k/yapi-to-typescript/compare/v3.30.2...v3.30.3) (2022-02-08)

### 修复

- 修复 Swagger 导出报错；对 JSONSchema.required 的处理应考虑其为 true 的情况 ([#68](https://github.com/fjc0k/yapi-to-typescript/issues/68)) ([fba38c8](https://github.com/fjc0k/yapi-to-typescript/commit/fba38c84fa48f773b40885c286eb408d86f1b1bd))

### [3.30.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.30.1...v3.30.2) (2022-01-26)

### 修复

- types.ts 应该按 browser 打包为 es5 ([41f0cc3](https://github.com/fjc0k/yapi-to-typescript/commit/41f0cc36946b7ec2a0830786793e2e394ee92a04))

### [3.30.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.30.0...v3.30.1) (2022-01-18)

### 修复

- 返回给业务的 JSONSchema 应不做处理 ([c1f8d8d](https://github.com/fjc0k/yapi-to-typescript/commit/c1f8d8d10f2061d8f30559b65a23e3a09c386940))

## [3.30.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.29.2...v3.30.0) (2021-12-27)

### 特性

- 通过 ytt init 初始化的配置文件中的 getRequestFunctionName 默认改为「以接口全路径生成请求函数名」并备注遇到请求函数名是语法关键词报错、重复时的解决方案 ([1aefd41](https://github.com/fjc0k/yapi-to-typescript/commit/1aefd417e4a235a23569510beb419efb32f2b2b3))
- 增加 Tree Shaking 标记使摇树优化生效 ([#66](https://github.com/fjc0k/yapi-to-typescript/issues/66)) ([badd33d](https://github.com/fjc0k/yapi-to-typescript/commit/badd33da15ddf4b62d02a2a79fe8d66d14e825ab))

### [3.29.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.29.1...v3.29.2) (2021-12-21)

### 文档

- 更新入群二维码 ([98610b3](https://github.com/fjc0k/yapi-to-typescript/commit/98610b3f759bfe551da8ba526dd72354605b9efe))

### [3.29.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.29.1...v3.29.2) (2021-12-21)

### 文档

- 更新入群二维码 ([98610b3](https://github.com/fjc0k/yapi-to-typescript/commit/98610b3f759bfe551da8ba526dd72354605b9efe))

<a name="3.29.1"></a>

## [3.29.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.29.0...v3.29.1) (2021-12-08)

### Bug Fixes

- 修复 Windows 环境下，tsc 编译的文件路径存在空格报错问题 ([#65](https://github.com/fjc0k/yapi-to-typescript/issues/65)) ([5ba8184](https://github.com/fjc0k/yapi-to-typescript/commit/5ba8184))

<a name="3.29.0"></a>

# [3.29.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.28.0...v3.29.0) (2021-12-04)

### Features

- 补充 uid（创建人 ID） 到 Interface（接口） 类型 ([63eefaf](https://github.com/fjc0k/yapi-to-typescript/commit/63eefaf))

<a name="3.28.0"></a>

# [3.28.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.27.0...v3.28.0) (2021-11-23)

### Features

- 支持通过 \_url 获取项目、分类、接口的 YApi 地址 ([bb1383b](https://github.com/fjc0k/yapi-to-typescript/commit/bb1383b))

<a name="3.27.0"></a>

# [3.27.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.26.2...v3.27.0) (2021-11-22)

### Features

- 新增配置 setRequestFunctionExtraInfo 设置传给请求函数的参数中的 extraInfo 的值 ([a942cc1](https://github.com/fjc0k/yapi-to-typescript/commit/a942cc1))

<a name="3.26.2"></a>

## [3.26.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.26.1...v3.26.2) (2021-10-25)

### Bug Fixes

- 生成的请求数据的 JSONSchema 可能为 undefined，给一个默认值保证是一个合法的 JSONSchema 空值 ([271f7fe](https://github.com/fjc0k/yapi-to-typescript/commit/271f7fe))

<a name="3.26.1"></a>

## [3.26.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.26.1-beta.1...v3.26.1) (2021-10-22)

<a name="3.26.1-beta.1"></a>

## [3.26.1-beta.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.26.1-beta.0...v3.26.1-beta.1) (2021-10-22)

### Bug Fixes

- 将 parser 强制设为 typescript 尝试解决 prettier 格式化报错的问题 ([b72380e](https://github.com/fjc0k/yapi-to-typescript/commit/b72380e))

<a name="3.26.1-beta.0"></a>

## [3.26.1-beta.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.26.0...v3.26.1-beta.0) (2021-10-22)

### Bug Fixes

- 尝试为 prettier 传入 filepath 选项解决格式化报错问题 ([c62c41e](https://github.com/fjc0k/yapi-to-typescript/commit/c62c41e))

<a name="3.26.0"></a>

# [3.26.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.25.1...v3.26.0) (2021-10-21)

### Bug Fixes

- 复用本地 prettier 配置 ([2e583de](https://github.com/fjc0k/yapi-to-typescript/commit/2e583de))

### Features

- 支持复用本地的 prettier 配置格式化生成的代码 ([#60](https://github.com/fjc0k/yapi-to-typescript/issues/60)) ([8382e66](https://github.com/fjc0k/yapi-to-typescript/commit/8382e66))

<a name="3.25.1"></a>

## [3.25.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.25.0...v3.25.1) (2021-09-24)

### Bug Fixes

- 仅 POST 类接口处理表单数据 ([#59](https://github.com/fjc0k/yapi-to-typescript/issues/59)) ([122e68d](https://github.com/fjc0k/yapi-to-typescript/commit/122e68d))

<a name="3.25.0"></a>

# [3.25.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.24.4...v3.25.0) (2021-09-08)

### Features

- 新增 customTypeMapping 将自定义类型转为 JSONSchema 类型 ([#57](https://github.com/fjc0k/yapi-to-typescript/issues/57)) ([6908c6d](https://github.com/fjc0k/yapi-to-typescript/commit/6908c6d))

<a name="3.24.4"></a>

## [3.24.4](https://github.com/fjc0k/yapi-to-typescript/compare/v3.24.3...v3.24.4) (2021-08-31)

### Bug Fixes

- 修复 TRequestData 拼写错误 ([#55](https://github.com/fjc0k/yapi-to-typescript/issues/55)) ([36aaae4](https://github.com/fjc0k/yapi-to-typescript/commit/36aaae4))

<a name="3.24.3"></a>

## [3.24.3](https://github.com/fjc0k/yapi-to-typescript/compare/v3.24.2...v3.24.3) (2021-08-16)

### Bug Fixes

- 将使用到的来自 vtils/types 的辅助类型打包到类型文件以避免项目本身 ts 版本过低导致的类型错误 ([06e7166](https://github.com/fjc0k/yapi-to-typescript/commit/06e7166))

<a name="3.24.2"></a>

## [3.24.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.24.1...v3.24.2) (2021-08-16)

### Bug Fixes

- typesOnly 模式下对于 FileData 的声明加上 ts-ignore 防止未使用到时报红 ([da2b084](https://github.com/fjc0k/yapi-to-typescript/commit/da2b084))

<a name="3.24.1"></a>

## [3.24.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.24.0...v3.24.1) (2021-07-31)

### Bug Fixes

- 直接构造请求函数而不是通过 makeRequest 构造请求函数，如此在 VSCode 中使用请求函数时可鼠标悬停显示注释 ([887298b](https://github.com/fjc0k/yapi-to-typescript/commit/887298b))

<a name="3.24.0"></a>

# [3.24.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.23.1...v3.24.0) (2021-07-30)

### Features

- 新增 comment.extraTags 添加额外的注释标签 ([dde64e2](https://github.com/fjc0k/yapi-to-typescript/commit/dde64e2))

<a name="3.23.1"></a>

## [3.23.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.23.0...v3.23.1) (2021-07-26)

### Bug Fixes

- typesOnly 模式下令 FileData 作为 File 的别名 ([3fa3975](https://github.com/fjc0k/yapi-to-typescript/commit/3fa3975))

<a name="3.23.0"></a>

# [3.23.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.22.4...v3.23.0) (2021-07-17)

### Features

- **dataKey:** 支持路径数组适配多层嵌套的情况 ([684905e](https://github.com/fjc0k/yapi-to-typescript/commit/684905e))

<a name="3.22.4"></a>

## [3.22.4](https://github.com/fjc0k/yapi-to-typescript/compare/v3.22.3...v3.22.4) (2021-07-16)

### Bug Fixes

- 通过 JSON Schema 生成类型时去除最外层的 description 以防止 JSTT 提取它作为类型的注释 ([97f1d24](https://github.com/fjc0k/yapi-to-typescript/commit/97f1d24))

<a name="3.22.3"></a>

## [3.22.3](https://github.com/fjc0k/yapi-to-typescript/compare/v3.22.2...v3.22.3) (2021-06-04)

### Bug Fixes

- **cli:** 当长时间处于获取数据状态时, 予以提示 ([c632ee0](https://github.com/fjc0k/yapi-to-typescript/commit/c632ee0))

<a name="3.22.2"></a>

## [3.22.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.22.1...v3.22.2) (2021-06-04)

### Bug Fixes

- 预处理 JSONSchema 时仅将 object 的 additionalProperties 属性设置为 false ([2b5e25a](https://github.com/fjc0k/yapi-to-typescript/commit/2b5e25a))

<a name="3.22.1"></a>

## [3.22.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.22.0...v3.22.1) (2021-05-31)

### Bug Fixes

- 将更多的 Java 基本类型处理为 JSONSchema 类型 ([46eb622](https://github.com/fjc0k/yapi-to-typescript/commit/46eb622))

<a name="3.22.0"></a>

# [3.22.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.21.1...v3.22.0) (2021-05-21)

### Features

- outputFilePath 支持函数 ([f3489fa](https://github.com/fjc0k/yapi-to-typescript/commit/f3489fa))

<a name="3.21.1"></a>

## [3.21.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.21.0...v3.21.1) (2021-05-21)

### Bug Fixes

- 删除 default，防止 json-schema-to-typescript 根据它推测类型 (close: [#52](https://github.com/fjc0k/yapi-to-typescript/issues/52)) ([1c16ccb](https://github.com/fjc0k/yapi-to-typescript/commit/1c16ccb))
- 处理类型名称为标准的 JSONSchema 类型名称 (close: [#53](https://github.com/fjc0k/yapi-to-typescript/issues/53)) ([3e0408b](https://github.com/fjc0k/yapi-to-typescript/commit/3e0408b))

<a name="3.21.0"></a>

# [3.21.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.20.0...v3.21.0) (2021-05-20)

### Features

- 支持解析路径参数、查询参数的类型（YApi-X 已支持为路径参数、查询参数设置类型） ([6a37735](https://github.com/fjc0k/yapi-to-typescript/commit/6a37735))

<a name="3.20.0"></a>

# [3.20.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.19.0...v3.20.0) (2021-05-13)

### Features

- 将 requestFunctionName 请求函数的名称加入请求配置 ([749f7b5](https://github.com/fjc0k/yapi-to-typescript/commit/749f7b5))

<a name="3.19.0"></a>

# [3.19.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.18.1...v3.19.0) (2021-04-26)

### Features

- 将接口请求头加入请求配置 ([67f6ce0](https://github.com/fjc0k/yapi-to-typescript/commit/67f6ce0))

<a name="3.18.1"></a>

## [3.18.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.18.0...v3.18.1) (2021-03-31)

### Bug Fixes

- 将 https.rejectUnauthorized 设为 false, 以忽略 SSL 证书检查 ([f9003b0](https://github.com/fjc0k/yapi-to-typescript/commit/f9003b0))

<a name="3.18.0"></a>

# [3.18.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.17.0...v3.18.0) (2021-03-27)

### Features

- **cli:** 支持通过 -c, --config 自定义配置文件 ([3e8dc50](https://github.com/fjc0k/yapi-to-typescript/commit/3e8dc50))
- **文档:** 添加使用、更新日志 ([56fb932](https://github.com/fjc0k/yapi-to-typescript/commit/56fb932))

<a name="3.17.0"></a>

# [3.17.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.16.0...v3.17.0) (2021-03-26)

### Bug Fixes

- **getFormData:** 动态引入 FormData 以解决小程序下报错问题 ([6c20bf2](https://github.com/fjc0k/yapi-to-typescript/commit/6c20bf2))

### Features

- 全新的文档 ([63f03d5](https://github.com/fjc0k/yapi-to-typescript/commit/63f03d5))
- 支持生成注释的相关配置 ([bc58378](https://github.com/fjc0k/yapi-to-typescript/commit/bc58378))

<a name="3.16.0"></a>

# [3.16.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.15.1...v3.16.0) (2021-03-16)

### Bug Fixes

- 传给 preproccessInterface 的接口信息应做深克隆以防止多人合作时都改变同一接口时互相冲突 ([5b9d127](https://github.com/fjc0k/yapi-to-typescript/commit/5b9d127))

### Features

- 使用 haoma compile 构建 ([41cb7c6](https://github.com/fjc0k/yapi-to-typescript/commit/41cb7c6))

<a name="3.15.1"></a>

## [3.15.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.15.0...v3.15.1) (2021-02-03)

### Bug Fixes

- 修复 Windows 下生成不了 js 代码的问题 ([#51](https://github.com/fjc0k/yapi-to-typescript/issues/51)) ([0181fb2](https://github.com/fjc0k/yapi-to-typescript/commit/0181fb2))

<a name="3.15.0"></a>

# [3.15.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.14.0...v3.15.0) (2021-02-01)

### Features

- 新增配置项 noUpdateTimeComment 是否不生成接口的更新时间注释 ([72c8afa](https://github.com/fjc0k/yapi-to-typescript/commit/72c8afa))

<a name="3.14.0"></a>

# [3.14.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.13.0...v3.14.0) (2021-01-13)

### Features

- preproccessInterface 可返回 false 排除当前接口 ([379d253](https://github.com/fjc0k/yapi-to-typescript/commit/379d253))

<a name="3.13.0"></a>

# [3.13.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.12.0...v3.13.0) (2020-12-24)

### Features

- 优化对 Swagger 各版本的支持 ([6d8ff12](https://github.com/fjc0k/yapi-to-typescript/commit/6d8ff12))
- 升级 json-schema-to-typescript ([df31d0a](https://github.com/fjc0k/yapi-to-typescript/commit/df31d0a))

<a name="3.12.0"></a>

# [3.12.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.11.2...v3.12.0) (2020-12-21)

### Features

- 请求函数参数增加 rawData 以获取原始请求数据；FileData 支持设置选项 ([9b12f39](https://github.com/fjc0k/yapi-to-typescript/commit/9b12f39))

<a name="3.11.2"></a>

## [3.11.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.11.1...v3.11.2) (2020-12-20)

### Bug Fixes

- 支持查询参数与其他参数共存 (close: [#34](https://github.com/fjc0k/yapi-to-typescript/issues/34)) (close: [#39](https://github.com/fjc0k/yapi-to-typescript/issues/39)) ([4057796](https://github.com/fjc0k/yapi-to-typescript/commit/4057796))

<a name="3.11.1"></a>

## [3.11.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.11.0...v3.11.1) (2020-12-11)

### Bug Fixes

- 修复 getFormData 错误 ([44df2ad](https://github.com/fjc0k/yapi-to-typescript/commit/44df2ad))

<a name="3.11.0"></a>

# [3.11.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.10.0...v3.11.0) (2020-12-11)

### Features

- 接口详情带上所属项目信息 ([452c1bf](https://github.com/fjc0k/yapi-to-typescript/commit/452c1bf))

<a name="3.10.0"></a>

# [3.10.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.9.0...v3.10.0) (2020-12-08)

### Features

- 支持生成请求数据和返回数据的 JSON Schema (close: [#49](https://github.com/fjc0k/yapi-to-typescript/issues/49)) ([6efd726](https://github.com/fjc0k/yapi-to-typescript/commit/6efd726))

<a name="3.9.0"></a>

# [3.9.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.8.1...v3.9.0) (2020-12-08)

### Features

- 请求函数入参新增属性 getFormData 以获取全部请求数据（包含文件）的 FormData 实例 ([c48368c](https://github.com/fjc0k/yapi-to-typescript/commit/c48368c))

<a name="3.8.1"></a>

## [3.8.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.8.0...v3.8.1) (2020-11-25)

### Bug Fixes

- Swagger 转 YApi 服务的端口优先使用 50505 ([63af417](https://github.com/fjc0k/yapi-to-typescript/commit/63af417))

<a name="3.8.0"></a>

# [3.8.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.7.0...v3.8.0) (2020-11-25)

### Features

- 支持 Swagger ([9c0f466](https://github.com/fjc0k/yapi-to-typescript/commit/9c0f466))

<a name="3.7.0"></a>

# [3.7.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.6.0...v3.7.0) (2020-09-24)

### Features

- 请求载荷新增 allData 表示所有数据 ([d881969](https://github.com/fjc0k/yapi-to-typescript/commit/d881969))

<a name="3.6.0"></a>

# [3.6.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.5.0...v3.6.0) (2020-09-21)

### Features

- 支持将 token 设为数组 ([6d51d83](https://github.com/fjc0k/yapi-to-typescript/commit/6d51d83))

<a name="3.5.0"></a>

# [3.5.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.4.1...v3.5.0) (2020-08-24)

### Features

- 生成代码时按一定规则排序, 保证相同配置多次生成结果的一致性 ([91c5705](https://github.com/fjc0k/yapi-to-typescript/commit/91c5705))

<a name="3.4.1"></a>

## [3.4.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.4.0...v3.4.1) (2020-08-24)

### Bug Fixes

- 删除通过 swagger 导入时未剔除的 ref (close: [#42](https://github.com/fjc0k/yapi-to-typescript/issues/42)) ([82a5cbd](https://github.com/fjc0k/yapi-to-typescript/commit/82a5cbd))

<a name="3.4.0"></a>

# [3.4.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1...v3.4.0) (2020-08-10)

### Features

- 支持项目配置下的接口基本路径 ([79f11d5](https://github.com/fjc0k/yapi-to-typescript/commit/79f11d5))

<a name="3.3.1"></a>

## [3.3.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.7...v3.3.1) (2020-08-10)

<a name="3.3.1-beta.7"></a>

## [3.3.1-beta.7](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.6...v3.3.1-beta.7) (2020-08-10)

### Features

- JSON 转 JSONSchema 时，取 JSON 数组的第一个作为参考对象 ([ddf9be1](https://github.com/fjc0k/yapi-to-typescript/commit/ddf9be1))

<a name="3.3.1-beta.6"></a>

## [3.3.1-beta.6](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.5...v3.3.1-beta.6) (2020-08-10)

### Features

- 优化根据 JSON 数据生成 JSONSchema ([fb6a9bb](https://github.com/fjc0k/yapi-to-typescript/commit/fb6a9bb))

<a name="3.3.1-beta.5"></a>

## [3.3.1-beta.5](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.4...v3.3.1-beta.5) (2020-08-10)

### Bug Fixes

- 解决生成 JavaScript 代码时覆盖问题 ([56f9e27](https://github.com/fjc0k/yapi-to-typescript/commit/56f9e27))

<a name="3.3.1-beta.4"></a>

## [3.3.1-beta.4](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.3...v3.3.1-beta.4) (2020-08-06)

### Features

- **cli:** 优化生成的配置文件 ([4dc5a54](https://github.com/fjc0k/yapi-to-typescript/commit/4dc5a54))

<a name="3.3.1-beta.3"></a>

## [3.3.1-beta.3](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.2...v3.3.1-beta.3) (2020-08-06)

### Bug Fixes

- **cli:** 不再支持 version 指令 ([e9b5f4f](https://github.com/fjc0k/yapi-to-typescript/commit/e9b5f4f))

<a name="3.3.1-beta.2"></a>

## [3.3.1-beta.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.1...v3.3.1-beta.2) (2020-08-06)

<a name="3.3.1-beta.1"></a>

## [3.3.1-beta.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.1-beta.0...v3.3.1-beta.1) (2020-08-06)

<a name="3.3.1-beta.0"></a>

## [3.3.1-beta.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.3.0...v3.3.1-beta.0) (2020-08-06)

### Features

- 重构 ([bfde560](https://github.com/fjc0k/yapi-to-typescript/commit/bfde560))

<a name="3.3.0"></a>

# [3.3.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.5...v3.3.0) (2020-08-05)

### Features

- 将查询参数序列号进请求路径中 (close: [#34](https://github.com/fjc0k/yapi-to-typescript/issues/34), close: [#39](https://github.com/fjc0k/yapi-to-typescript/issues/39)) ([ac43e58](https://github.com/fjc0k/yapi-to-typescript/commit/ac43e58))
- 支持生成 JavaScript 代码 ([2787d51](https://github.com/fjc0k/yapi-to-typescript/commit/2787d51))
- 移除字段名称首尾空格 ([bfed5cb](https://github.com/fjc0k/yapi-to-typescript/commit/bfed5cb))
- **src/utils:** 修改当 yapi 下发的字段名称中含有空格时出现的字段多余空格问题 ([#28](https://github.com/fjc0k/yapi-to-typescript/issues/28)) ([23e3e35](https://github.com/fjc0k/yapi-to-typescript/commit/23e3e35))

<a name="3.2.0"></a>

# [3.2.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.5...v3.2.0) (2020-05-12)

### Features

- 移除字段名称首尾空格 ([bfed5cb](https://github.com/fjc0k/yapi-to-typescript/commit/bfed5cb))
- **src/utils:** 修改当 yapi 下发的字段名称中含有空格时出现的字段多余空格问题 ([#28](https://github.com/fjc0k/yapi-to-typescript/issues/28)) ([23e3e35](https://github.com/fjc0k/yapi-to-typescript/commit/23e3e35))

<a name="3.1.5"></a>

## [3.1.5](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.4...v3.1.5) (2020-05-09)

<a name="3.1.4"></a>

## [3.1.4](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.3...v3.1.4) (2020-05-09)

### Bug Fixes

- 修复类型不能读取的问题 ([#26](https://github.com/fjc0k/yapi-to-typescript/issues/26)) ([1f1a682](https://github.com/fjc0k/yapi-to-typescript/commit/1f1a682))

<a name="3.1.3"></a>

## [3.1.3](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.2...v3.1.3) (2020-04-30)

<a name="3.1.2"></a>

## [3.1.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.1...v3.1.2) (2020-04-20)

### Bug Fixes

- 同一个项目导出接口列表 API 应只请求一次 ([9668a94](https://github.com/fjc0k/yapi-to-typescript/commit/9668a94))

<a name="3.1.1"></a>

## [3.1.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.1.0...v3.1.1) (2020-04-13)

### Bug Fixes

- 去除服务器地址末尾的 / (close:[#22](https://github.com/fjc0k/yapi-to-typescript/issues/22)) ([afcbc80](https://github.com/fjc0k/yapi-to-typescript/commit/afcbc80))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/fjc0k/yapi-to-typescript/compare/v3.0.2...v3.1.0) (2020-03-05)

### Features

- 支持排除指定分类 ([cb846f7](https://github.com/fjc0k/yapi-to-typescript/commit/cb846f7))

<a name="3.0.2"></a>

## [3.0.2](https://github.com/fjc0k/yapi-to-typescript/compare/v3.0.1...v3.0.2) (2020-02-22)

### Bug Fixes

- RequestConfig 中应指定 RequestDataOptional ([5f946ae](https://github.com/fjc0k/yapi-to-typescript/commit/5f946ae))

<a name="3.0.1"></a>

## [3.0.1](https://github.com/fjc0k/yapi-to-typescript/compare/v3.0.0...v3.0.1) (2020-02-20)

### Bug Fixes

- 排除 src/api ([30608c0](https://github.com/fjc0k/yapi-to-typescript/commit/30608c0))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/fjc0k/yapi-to-typescript/compare/v2.0.2...v3.0.0) (2020-02-20)

### Bug Fixes

- 仅在 React Hooks 启用时生成相关代码 ([7736b7b](https://github.com/fjc0k/yapi-to-typescript/commit/7736b7b))

### Features

- 重写 React Hooks 实现 ([4ba4f15](https://github.com/fjc0k/yapi-to-typescript/commit/4ba4f15))
- 重构 ([91a6fc3](https://github.com/fjc0k/yapi-to-typescript/commit/91a6fc3))

<a name="2.0.2"></a>

## [2.0.2](https://github.com/fjc0k/yapi-to-typescript/compare/v2.0.1...v2.0.2) (2020-02-11)

### Bug Fixes

- 忽略 JSONSchema 数组的长度限制 ([#20](https://github.com/fjc0k/yapi-to-typescript/issues/20)) ([096a72b](https://github.com/fjc0k/yapi-to-typescript/commit/096a72b))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/fjc0k/yapi-to-typescript/compare/v2.0.0...v2.0.1) (2020-01-13)

<a name="2.0.0"></a>

# [2.0.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.20.0...v2.0.0) (2020-01-12)

### Features

- 接口请求函数支持设置选项 ([4a23350](https://github.com/fjc0k/yapi-to-typescript/commit/4a23350))

<a name="1.20.0"></a>

# [1.20.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.19.2...v1.20.0) (2019-12-18)

### Bug Fixes

- prettier-ignore ([8f89ecb](https://github.com/fjc0k/yapi-to-typescript/commit/8f89ecb))
- 请求文件支持 .jsx、.tsx 后缀 ([0738605](https://github.com/fjc0k/yapi-to-typescript/commit/0738605))

### Features

- 使用 prettier 美化生成的接口文件 ([a3fe676](https://github.com/fjc0k/yapi-to-typescript/commit/a3fe676))

<a name="1.19.2"></a>

## [1.19.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.19.1...v1.19.2) (2019-12-12)

<a name="1.19.1"></a>

## [1.19.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.19.0...v1.19.1) (2019-12-10)

### Bug Fixes

- **ci:** 测试时使用 unix 时间戳 ([5d1edd0](https://github.com/fjc0k/yapi-to-typescript/commit/5d1edd0))

<a name="1.19.0"></a>

# [1.19.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.3...v1.19.0) (2019-12-10)

### Features

- 为生成的代码增加接口摘要信息 ([d6daad2](https://github.com/fjc0k/yapi-to-typescript/commit/d6daad2))
- 生成的文件添加 prettier-ignore ([66d5156](https://github.com/fjc0k/yapi-to-typescript/commit/66d5156))

<a name="1.18.3"></a>

## [1.18.3](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.2...v1.18.3) (2019-12-04)

### Bug Fixes

- 防止 typeName 被 JSTT 转换 (close: [#17](https://github.com/fjc0k/yapi-to-typescript/issues/17)) ([58a77ac](https://github.com/fjc0k/yapi-to-typescript/commit/58a77ac))

<a name="1.18.2"></a>

## [1.18.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.1...v1.18.2) (2019-11-26)

### Bug Fixes

- export ApiHook ([c8a8d9a](https://github.com/fjc0k/yapi-to-typescript/commit/c8a8d9a))

<a name="1.18.1"></a>

## [1.18.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.0...v1.18.1) (2019-09-17)

<a name="1.18.0"></a>

# [1.18.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.17.1...v1.18.0) (2019-09-17)

### Features

- 支持路径参数 (close: [#13](https://github.com/fjc0k/yapi-to-typescript/issues/13)) ([a15d848](https://github.com/fjc0k/yapi-to-typescript/commit/a15d848))

<a name="1.17.1"></a>

## [1.17.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.17.0...v1.17.1) (2019-09-15)

### Bug Fixes

- **parseRequestData:** 解析非对象值时应将其值设为数据值 ([336906f](https://github.com/fjc0k/yapi-to-typescript/commit/336906f))

<a name="1.17.0"></a>

# [1.17.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.16.0...v1.17.0) (2019-09-12)

### Features

- **hooks:** 支持 refresh ([4ff6b43](https://github.com/fjc0k/yapi-to-typescript/commit/4ff6b43))

<a name="1.16.0"></a>

# [1.16.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.15.0...v1.16.0) (2019-09-11)

### Features

- **React Hooks:** 不再为 data 设置 null 类型，你总应该在 loading 为 false 且 error 为空时使用 data，此时 data 是类型安全的 ([5451646](https://github.com/fjc0k/yapi-to-typescript/commit/5451646))

<a name="1.15.0"></a>

# [1.15.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.14.0...v1.15.0) (2019-09-02)

### Features

- **React Hooks:** 支持取消请求 ([5583b63](https://github.com/fjc0k/yapi-to-typescript/commit/5583b63))

<a name="1.14.0"></a>

# [1.14.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.13.0...v1.14.0) (2019-08-30)

### Features

- **React Hooks:** trigger 支持传入回调，在请求触发成功后执行 ([92e9f1f](https://github.com/fjc0k/yapi-to-typescript/commit/92e9f1f))

<a name="1.13.0"></a>

# [1.13.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.12.1...v1.13.0) (2019-08-30)

### Features

- 完善 React Hooks 支持 ([5383a8a](https://github.com/fjc0k/yapi-to-typescript/commit/5383a8a))

<a name="1.12.1"></a>

## [1.12.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.12.0...v1.12.1) (2019-08-27)

<a name="1.12.0"></a>

# [1.12.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.11.0...v1.12.0) (2019-08-27)

### Features

- 支持 React Hooks (close: 12) ([d5df4a8](https://github.com/fjc0k/yapi-to-typescript/commit/d5df4a8))

<a name="1.11.0"></a>

# [1.11.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.10.1...v1.11.0) (2019-08-20)

### Features

- 重构 CLI ([70fba8d](https://github.com/fjc0k/yapi-to-typescript/commit/70fba8d))

<a name="1.10.1"></a>

## [1.10.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.10.0...v1.10.1) (2019-08-20)

<a name="1.10.0"></a>

# [1.10.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.9.0...v1.10.0) (2019-08-19)

### Features

- 优化配置，将更多选项移至 SharedConfig，getRequestFunctionName 现在拥有默认值 ([bdb9b3c](https://github.com/fjc0k/yapi-to-typescript/commit/bdb9b3c))

<a name="1.9.0"></a>

# [1.9.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.8.0...v1.9.0) (2019-08-19)

### Bug Fixes

- 分类下的接口列表为空时不生成相关代码 ([9f64e09](https://github.com/fjc0k/yapi-to-typescript/commit/9f64e09))

### Features

- 支持设置 0 表示全部分类 ([1fc0f69](https://github.com/fjc0k/yapi-to-typescript/commit/1fc0f69))

<a name="1.8.0"></a>

# [1.8.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.7.2...v1.8.0) (2019-08-09)

### Features

- 模板重构 ([41088a8](https://github.com/fjc0k/yapi-to-typescript/commit/41088a8))

<a name="1.7.2"></a>

## [1.7.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.7.1...v1.7.2) (2019-07-10)

### Bug Fixes

- 解决分类 ID 指定多个时存在的问题 (close: [#11](https://github.com/fjc0k/yapi-to-typescript/issues/11)) ([ba09652](https://github.com/fjc0k/yapi-to-typescript/commit/ba09652))

<a name="1.7.1"></a>

## [1.7.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.7.0...v1.7.1) (2019-06-29)

<a name="1.7.0"></a>

# [1.7.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.6.1...v1.7.0) (2019-06-29)

### Features

- 支持 typesOnly 选项 ([#10](https://github.com/fjc0k/yapi-to-typescript/issues/10)) ([9b246ee](https://github.com/fjc0k/yapi-to-typescript/commit/9b246ee))

<a name="1.6.1"></a>

## [1.6.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.6.0...v1.6.1) (2019-06-12)

<a name="1.6.0"></a>

# [1.6.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.5.2...v1.6.0) (2019-06-12)

### Features

- 新增 devEnvName 选项以生成 devUrl 地址 ([ac8a96e](https://github.com/fjc0k/yapi-to-typescript/commit/ac8a96e))

<a name="1.5.2"></a>

## [1.5.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.5.1...v1.5.2) (2019-04-29)

<a name="1.5.1"></a>

## [1.5.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.5.0...v1.5.1) (2019-04-29)

<a name="1.5.0"></a>

# [1.5.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.4.0...v1.5.0) (2019-04-29)

### Features

- 简化默认配置文件 ([2de4869](https://github.com/fjc0k/yapi-to-typescript/commit/2de4869))

<a name="1.4.0"></a>

# [1.4.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.3.1...v1.4.0) (2019-04-28)

### Features

- **typing:** parseRequestData 可接受 undefined 参数 ([d9f7c76](https://github.com/fjc0k/yapi-to-typescript/commit/d9f7c76))

<a name="1.3.1"></a>

## [1.3.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.3.0...v1.3.1) (2019-04-26)

### Bug Fixes

- 返回数据为 raw 时返回类型应为 any ([330c11e](https://github.com/fjc0k/yapi-to-typescript/commit/330c11e))

<a name="1.3.0"></a>

# [1.3.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.3...v1.3.0) (2019-04-26)

### Features

- 支持设置多个分类 ID ([916f484](https://github.com/fjc0k/yapi-to-typescript/commit/916f484))

<a name="1.2.3"></a>

## [1.2.3](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.2...v1.2.3) (2019-04-22)

<a name="1.2.2"></a>

## [1.2.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.1...v1.2.2) (2019-04-22)

### Bug Fixes

- req_body_type 为空时将 requestBodyType 设为 none ([58da3c1](https://github.com/fjc0k/yapi-to-typescript/commit/58da3c1))

<a name="1.2.1"></a>

## [1.2.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.0...v1.2.1) (2019-04-22)

### Bug Fixes

- 修复对空 jsonSchema 的判断 ([4e47933](https://github.com/fjc0k/yapi-to-typescript/commit/4e47933))

<a name="1.2.0"></a>

# [1.2.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.1.1...v1.2.0) (2019-04-18)

### Features

- **ytt.config.ts:** 令 getRequestDataTypeName 和 getResponseDataTypeName 可选 ([be83d17](https://github.com/fjc0k/yapi-to-typescript/commit/be83d17))

<a name="1.1.1"></a>

## [1.1.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.1.0...v1.1.1) (2019-04-18)

### Performance Improvements

- 提取分类的 dataKey ([684f95b](https://github.com/fjc0k/yapi-to-typescript/commit/684f95b))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.5...v1.1.0) (2019-04-18)

### Features

- 将 dataKey 加入 requestConfig ([0297c2f](https://github.com/fjc0k/yapi-to-typescript/commit/0297c2f))

<a name="1.0.5"></a>

## [1.0.5](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.4...v1.0.5) (2019-04-18)

### Bug Fixes

- 补全传给 preproccessInterface 的参数 ([664354a](https://github.com/fjc0k/yapi-to-typescript/commit/664354a))

<a name="1.0.4"></a>

## [1.0.4](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.3...v1.0.4) (2019-04-18)

### Bug Fixes

- 去除 requestFunctionFilePath 尾部的 .js 或 .ts 后缀 ([f0e0fcd](https://github.com/fjc0k/yapi-to-typescript/commit/f0e0fcd))

<a name="1.0.3"></a>

## [1.0.3](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.2...v1.0.3) (2019-04-18)

### Bug Fixes

- **tests:** 仅测试生成的内容 ([c72bb50](https://github.com/fjc0k/yapi-to-typescript/commit/c72bb50))

<a name="1.0.2"></a>

## [1.0.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.1...v1.0.2) (2019-04-18)

### Bug Fixes

- **tests:** 快照名称应与具体路径无关 ([2b973bf](https://github.com/fjc0k/yapi-to-typescript/commit/2b973bf))

<a name="1.0.1"></a>

## [1.0.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.0...v1.0.1) (2019-04-18)

### Bug Fixes

- 发布至 npm 时应包含 client 文件夹 ([f698eb0](https://github.com/fjc0k/yapi-to-typescript/commit/f698eb0))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.4...v1.0.0) (2019-04-18)

### Features

- 基本完成 ([4e0cd6f](https://github.com/fjc0k/yapi-to-typescript/commit/4e0cd6f))
- 完成 1.0 ([0c13870](https://github.com/fjc0k/yapi-to-typescript/commit/0c13870))

<a name="0.10.4"></a>

## [0.10.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.3...v0.10.4) (2019-03-01)

<a name="0.10.3"></a>

## [0.10.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.2...v0.10.3) (2019-03-01)

<a name="0.10.2"></a>

## [0.10.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.1...v0.10.2) (2019-02-28)

<a name="0.10.1"></a>

## [0.10.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.0...v0.10.1) (2019-02-28)

### Bug Fixes

- 为 json-schema-generator 库添加类型定义 ([a313f3e](https://github.com/fjc0k/yapi-to-typescript/commit/a313f3e))

<a name="0.10.0"></a>

# [0.10.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.6...v0.10.0) (2019-02-28)

### Features

- 类型及代码风格优化、依赖升级 ([e71f84d](https://github.com/fjc0k/yapi-to-typescript/commit/e71f84d))

<a name="0.9.6"></a>

## [0.9.6](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.5...v0.9.6) (2019-02-27)

### Bug Fixes

- 发起 GET 请求时，将 requestBodyType 设为 query ([09796cc](https://github.com/fjc0k/yapi-to-typescript/commit/09796cc))

<a name="0.9.5"></a>

## [0.9.5](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.4...v0.9.5) (2019-02-26)

### Bug Fixes

- requestData 未设置时应跳过 ([9a08fe9](https://github.com/fjc0k/yapi-to-typescript/commit/9a08fe9))

<a name="0.9.4"></a>

## [0.9.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.3...v0.9.4) (2019-02-21)

### Bug Fixes

- **docs:** 应将 ytt 安装为 dependencies ([3fe2e6c](https://github.com/fjc0k/yapi-to-typescript/commit/3fe2e6c))

<a name="0.9.3"></a>

## [0.9.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.2...v0.9.3) (2019-02-20)

### Bug Fixes

- 确保 api.list 存在且不为空 ([6cd0cea](https://github.com/fjc0k/yapi-to-typescript/commit/6cd0cea))

<a name="0.9.2"></a>

## [0.9.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.1...v0.9.2) (2019-02-19)

### Bug Fixes

- 将 compilerOptions.module 设为 commonjs 确保可正常解析 ytt.config.ts (close: [#5](https://github.com/fjc0k/yapi-to-typescript/issues/5)) ([df3ce5e](https://github.com/fjc0k/yapi-to-typescript/commit/df3ce5e))

<a name="0.9.1"></a>

## [0.9.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.0...v0.9.1) (2019-02-13)

<a name="0.9.0"></a>

# [0.9.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.8.0...v0.9.0) (2019-02-12)

### Features

- 支持 openapi 登录 (close: [#4](https://github.com/fjc0k/yapi-to-typescript/issues/4)) ([c2665df](https://github.com/fjc0k/yapi-to-typescript/commit/c2665df))

<a name="0.8.0"></a>

# [0.8.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.7...v0.8.0) (2019-01-22)

### Features

- 完善上传文件的实现 ([f87e323](https://github.com/fjc0k/yapi-to-typescript/commit/f87e323))

<a name="0.7.7"></a>

## [0.7.7](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.6...v0.7.7) (2019-01-22)

<a name="0.7.6"></a>

## [0.7.6](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.5...v0.7.6) (2019-01-22)

<a name="0.7.5"></a>

## [0.7.5](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.4...v0.7.5) (2019-01-21)

<a name="0.7.4"></a>

## [0.7.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.3...v0.7.4) (2019-01-21)

<a name="0.7.3"></a>

## [0.7.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.2...v0.7.3) (2019-01-21)

<a name="0.7.2"></a>

## [0.7.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.1...v0.7.2) (2019-01-21)

<a name="0.7.1"></a>

## [0.7.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.0...v0.7.1) (2019-01-21)

<a name="0.7.0"></a>

# [0.7.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.6.0...v0.7.0) (2019-01-21)

### Bug Fixes

- 修正配置文件内容缩进 ([10ae2a4](https://github.com/fjc0k/yapi-to-typescript/commit/10ae2a4))

### Features

- 支持 extraCookies ([3e0301f](https://github.com/fjc0k/yapi-to-typescript/commit/3e0301f))
- 支持 LDAP 登录方式 ([bbb07fb](https://github.com/fjc0k/yapi-to-typescript/commit/bbb07fb))

<a name="0.6.0"></a>

# [0.6.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.5.0...v0.6.0) (2019-01-09)

### Features

- 完善测试 ([f070639](https://github.com/fjc0k/yapi-to-typescript/commit/f070639))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.4.2...v0.5.0) (2019-01-09)

### Features

- 优化 ([8dfe154](https://github.com/fjc0k/yapi-to-typescript/commit/8dfe154))
- 增加一些辅助工具 ([db1f1de](https://github.com/fjc0k/yapi-to-typescript/commit/db1f1de))

<a name="0.4.2"></a>

## [0.4.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.4.1...v0.4.2) (2018-12-26)

### Bug Fixes

- res_body 可能为空 ([2cfd029](https://github.com/fjc0k/yapi-to-typescript/commit/2cfd029))

<a name="0.4.1"></a>

## [0.4.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.4.0...v0.4.1) (2018-12-11)

### Bug Fixes

- tsc 生成的 lib 有误 ([231e916](https://github.com/fjc0k/yapi-to-typescript/commit/231e916))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.3.0...v0.4.0) (2018-12-10)

### Features

- 支持 init 初始化配置文件 ([709fbbf](https://github.com/fjc0k/yapi-to-typescript/commit/709fbbf))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.4...v0.3.0) (2018-12-10)

### Features

- 暴露些常用的 API ([f23bf9c](https://github.com/fjc0k/yapi-to-typescript/commit/f23bf9c))

<a name="0.2.4"></a>

## [0.2.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.3...v0.2.4) (2018-12-07)

### Bug Fixes

- 使用 LF 换行符 (closes: [#2](https://github.com/fjc0k/yapi-to-typescript/issues/2)) ([c5c87fb](https://github.com/fjc0k/yapi-to-typescript/commit/c5c87fb))

<a name="0.2.3"></a>

## [0.2.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.2...v0.2.3) (2018-12-01)

<a name="0.2.2"></a>

## [0.2.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.1...v0.2.2) (2018-11-30)

<a name="0.2.1"></a>

## [0.2.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.0...v0.2.1) (2018-11-30)

### Bug Fixes

- types ([ad1d915](https://github.com/fjc0k/yapi-to-typescript/commit/ad1d915))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.1.0...v0.2.0) (2018-11-30)

### Bug Fixes

- 将 additionalProperties 设为 false ([f78d7e6](https://github.com/fjc0k/yapi-to-typescript/commit/f78d7e6))
- 目标代码应为 es5 以兼容浏览器 ([76e68eb](https://github.com/fjc0k/yapi-to-typescript/commit/76e68eb))

### Features

- data 接口为 any 时，将其设为可选 ([50b7e21](https://github.com/fjc0k/yapi-to-typescript/commit/50b7e21))
- 优化 dataKey 支持 ([cf5d1de](https://github.com/fjc0k/yapi-to-typescript/commit/cf5d1de))
- 添加 FileData 文件包装器 ([8291e90](https://github.com/fjc0k/yapi-to-typescript/commit/8291e90))

<a name="0.1.0"></a>

# 0.1.0 (2018-11-29)

### Features

- 初始化项目 ([fd23263](https://github.com/fjc0k/yapi-to-typescript/commit/fd23263))
