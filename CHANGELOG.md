# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.18.3"></a>
## [1.18.3](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.2...v1.18.3) (2019-12-04)


### Bug Fixes

* 防止 typeName 被 JSTT 转换 (close: [#17](https://github.com/fjc0k/yapi-to-typescript/issues/17)) ([58a77ac](https://github.com/fjc0k/yapi-to-typescript/commit/58a77ac))



<a name="1.18.2"></a>
## [1.18.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.1...v1.18.2) (2019-11-26)


### Bug Fixes

* export ApiHook ([c8a8d9a](https://github.com/fjc0k/yapi-to-typescript/commit/c8a8d9a))



<a name="1.18.1"></a>
## [1.18.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.18.0...v1.18.1) (2019-09-17)



<a name="1.18.0"></a>
# [1.18.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.17.1...v1.18.0) (2019-09-17)


### Features

* 支持路径参数 (close: [#13](https://github.com/fjc0k/yapi-to-typescript/issues/13)) ([a15d848](https://github.com/fjc0k/yapi-to-typescript/commit/a15d848))



<a name="1.17.1"></a>
## [1.17.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.17.0...v1.17.1) (2019-09-15)


### Bug Fixes

* **parseRequestData:** 解析非对象值时应将其值设为数据值 ([336906f](https://github.com/fjc0k/yapi-to-typescript/commit/336906f))



<a name="1.17.0"></a>
# [1.17.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.16.0...v1.17.0) (2019-09-12)


### Features

* **hooks:** 支持 refresh ([4ff6b43](https://github.com/fjc0k/yapi-to-typescript/commit/4ff6b43))



<a name="1.16.0"></a>
# [1.16.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.15.0...v1.16.0) (2019-09-11)


### Features

* **React Hooks:** 不再为 data 设置 null 类型，你总应该在 loading 为 false 且 error 为空时使用 data，此时 data 是类型安全的 ([5451646](https://github.com/fjc0k/yapi-to-typescript/commit/5451646))



<a name="1.15.0"></a>
# [1.15.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.14.0...v1.15.0) (2019-09-02)


### Features

* **React Hooks:** 支持取消请求 ([5583b63](https://github.com/fjc0k/yapi-to-typescript/commit/5583b63))



<a name="1.14.0"></a>
# [1.14.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.13.0...v1.14.0) (2019-08-30)


### Features

* **React Hooks:** trigger 支持传入回调，在请求触发成功后执行 ([92e9f1f](https://github.com/fjc0k/yapi-to-typescript/commit/92e9f1f))



<a name="1.13.0"></a>
# [1.13.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.12.1...v1.13.0) (2019-08-30)


### Features

* 完善 React Hooks 支持 ([5383a8a](https://github.com/fjc0k/yapi-to-typescript/commit/5383a8a))



<a name="1.12.1"></a>
## [1.12.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.12.0...v1.12.1) (2019-08-27)



<a name="1.12.0"></a>
# [1.12.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.11.0...v1.12.0) (2019-08-27)


### Features

* 支持 React Hooks (close: 12) ([d5df4a8](https://github.com/fjc0k/yapi-to-typescript/commit/d5df4a8))



<a name="1.11.0"></a>
# [1.11.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.10.1...v1.11.0) (2019-08-20)


### Features

* 重构 CLI ([70fba8d](https://github.com/fjc0k/yapi-to-typescript/commit/70fba8d))



<a name="1.10.1"></a>
## [1.10.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.10.0...v1.10.1) (2019-08-20)



<a name="1.10.0"></a>
# [1.10.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.9.0...v1.10.0) (2019-08-19)


### Features

* 优化配置，将更多选项移至 SharedConfig，getRequestFunctionName 现在拥有默认值 ([bdb9b3c](https://github.com/fjc0k/yapi-to-typescript/commit/bdb9b3c))



<a name="1.9.0"></a>
# [1.9.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.8.0...v1.9.0) (2019-08-19)


### Bug Fixes

* 分类下的接口列表为空时不生成相关代码 ([9f64e09](https://github.com/fjc0k/yapi-to-typescript/commit/9f64e09))


### Features

* 支持设置 0 表示全部分类 ([1fc0f69](https://github.com/fjc0k/yapi-to-typescript/commit/1fc0f69))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.7.2...v1.8.0) (2019-08-09)


### Features

* 模板重构 ([41088a8](https://github.com/fjc0k/yapi-to-typescript/commit/41088a8))



<a name="1.7.2"></a>
## [1.7.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.7.1...v1.7.2) (2019-07-10)


### Bug Fixes

* 解决分类 ID 指定多个时存在的问题 (close: [#11](https://github.com/fjc0k/yapi-to-typescript/issues/11)) ([ba09652](https://github.com/fjc0k/yapi-to-typescript/commit/ba09652))



<a name="1.7.1"></a>
## [1.7.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.7.0...v1.7.1) (2019-06-29)



<a name="1.7.0"></a>
# [1.7.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.6.1...v1.7.0) (2019-06-29)


### Features

* 支持 typesOnly 选项 ([#10](https://github.com/fjc0k/yapi-to-typescript/issues/10)) ([9b246ee](https://github.com/fjc0k/yapi-to-typescript/commit/9b246ee))



<a name="1.6.1"></a>
## [1.6.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.6.0...v1.6.1) (2019-06-12)



<a name="1.6.0"></a>
# [1.6.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.5.2...v1.6.0) (2019-06-12)


### Features

* 新增 devEnvName 选项以生成 devUrl 地址 ([ac8a96e](https://github.com/fjc0k/yapi-to-typescript/commit/ac8a96e))



<a name="1.5.2"></a>
## [1.5.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.5.1...v1.5.2) (2019-04-29)



<a name="1.5.1"></a>
## [1.5.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.5.0...v1.5.1) (2019-04-29)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.4.0...v1.5.0) (2019-04-29)


### Features

* 简化默认配置文件 ([2de4869](https://github.com/fjc0k/yapi-to-typescript/commit/2de4869))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.3.1...v1.4.0) (2019-04-28)


### Features

* **typing:** parseRequestData 可接受 undefined 参数 ([d9f7c76](https://github.com/fjc0k/yapi-to-typescript/commit/d9f7c76))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.3.0...v1.3.1) (2019-04-26)


### Bug Fixes

* 返回数据为 raw 时返回类型应为 any ([330c11e](https://github.com/fjc0k/yapi-to-typescript/commit/330c11e))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.3...v1.3.0) (2019-04-26)


### Features

* 支持设置多个分类 ID ([916f484](https://github.com/fjc0k/yapi-to-typescript/commit/916f484))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.2...v1.2.3) (2019-04-22)



<a name="1.2.2"></a>
## [1.2.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.1...v1.2.2) (2019-04-22)


### Bug Fixes

* req_body_type 为空时将 requestBodyType 设为 none ([58da3c1](https://github.com/fjc0k/yapi-to-typescript/commit/58da3c1))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.2.0...v1.2.1) (2019-04-22)


### Bug Fixes

* 修复对空 jsonSchema 的判断 ([4e47933](https://github.com/fjc0k/yapi-to-typescript/commit/4e47933))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.1.1...v1.2.0) (2019-04-18)


### Features

* **ytt.config.ts:** 令 getRequestDataTypeName 和 getResponseDataTypeName 可选 ([be83d17](https://github.com/fjc0k/yapi-to-typescript/commit/be83d17))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.1.0...v1.1.1) (2019-04-18)


### Performance Improvements

* 提取分类的 dataKey ([684f95b](https://github.com/fjc0k/yapi-to-typescript/commit/684f95b))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.5...v1.1.0) (2019-04-18)


### Features

* 将 dataKey 加入 requestConfig ([0297c2f](https://github.com/fjc0k/yapi-to-typescript/commit/0297c2f))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.4...v1.0.5) (2019-04-18)


### Bug Fixes

* 补全传给 preproccessInterface 的参数 ([664354a](https://github.com/fjc0k/yapi-to-typescript/commit/664354a))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.3...v1.0.4) (2019-04-18)


### Bug Fixes

* 去除 requestFunctionFilePath 尾部的 .js 或 .ts 后缀 ([f0e0fcd](https://github.com/fjc0k/yapi-to-typescript/commit/f0e0fcd))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.2...v1.0.3) (2019-04-18)


### Bug Fixes

* **tests:** 仅测试生成的内容 ([c72bb50](https://github.com/fjc0k/yapi-to-typescript/commit/c72bb50))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.1...v1.0.2) (2019-04-18)


### Bug Fixes

* **tests:** 快照名称应与具体路径无关 ([2b973bf](https://github.com/fjc0k/yapi-to-typescript/commit/2b973bf))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/fjc0k/yapi-to-typescript/compare/v1.0.0...v1.0.1) (2019-04-18)


### Bug Fixes

* 发布至 npm 时应包含 client 文件夹 ([f698eb0](https://github.com/fjc0k/yapi-to-typescript/commit/f698eb0))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.4...v1.0.0) (2019-04-18)


### Features

* 基本完成 ([4e0cd6f](https://github.com/fjc0k/yapi-to-typescript/commit/4e0cd6f))
* 完成 1.0 ([0c13870](https://github.com/fjc0k/yapi-to-typescript/commit/0c13870))



<a name="0.10.4"></a>
## [0.10.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.3...v0.10.4) (2019-03-01)



<a name="0.10.3"></a>
## [0.10.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.2...v0.10.3) (2019-03-01)



<a name="0.10.2"></a>
## [0.10.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.1...v0.10.2) (2019-02-28)



<a name="0.10.1"></a>
## [0.10.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.10.0...v0.10.1) (2019-02-28)


### Bug Fixes

* 为 json-schema-generator 库添加类型定义 ([a313f3e](https://github.com/fjc0k/yapi-to-typescript/commit/a313f3e))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.6...v0.10.0) (2019-02-28)


### Features

* 类型及代码风格优化、依赖升级 ([e71f84d](https://github.com/fjc0k/yapi-to-typescript/commit/e71f84d))



<a name="0.9.6"></a>
## [0.9.6](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.5...v0.9.6) (2019-02-27)


### Bug Fixes

* 发起 GET 请求时，将 requestBodyType 设为 query ([09796cc](https://github.com/fjc0k/yapi-to-typescript/commit/09796cc))



<a name="0.9.5"></a>
## [0.9.5](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.4...v0.9.5) (2019-02-26)


### Bug Fixes

* requestData 未设置时应跳过 ([9a08fe9](https://github.com/fjc0k/yapi-to-typescript/commit/9a08fe9))



<a name="0.9.4"></a>
## [0.9.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.3...v0.9.4) (2019-02-21)


### Bug Fixes

* **docs:** 应将 ytt 安装为 dependencies ([3fe2e6c](https://github.com/fjc0k/yapi-to-typescript/commit/3fe2e6c))



<a name="0.9.3"></a>
## [0.9.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.2...v0.9.3) (2019-02-20)


### Bug Fixes

* 确保 api.list 存在且不为空 ([6cd0cea](https://github.com/fjc0k/yapi-to-typescript/commit/6cd0cea))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.1...v0.9.2) (2019-02-19)


### Bug Fixes

* 将 compilerOptions.module 设为 commonjs 确保可正常解析 ytt.config.ts (close: [#5](https://github.com/fjc0k/yapi-to-typescript/issues/5)) ([df3ce5e](https://github.com/fjc0k/yapi-to-typescript/commit/df3ce5e))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.9.0...v0.9.1) (2019-02-13)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.8.0...v0.9.0) (2019-02-12)


### Features

* 支持 openapi 登录 (close: [#4](https://github.com/fjc0k/yapi-to-typescript/issues/4)) ([c2665df](https://github.com/fjc0k/yapi-to-typescript/commit/c2665df))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.7.7...v0.8.0) (2019-01-22)


### Features

* 完善上传文件的实现 ([f87e323](https://github.com/fjc0k/yapi-to-typescript/commit/f87e323))



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

* 修正配置文件内容缩进 ([10ae2a4](https://github.com/fjc0k/yapi-to-typescript/commit/10ae2a4))


### Features

* 支持 extraCookies ([3e0301f](https://github.com/fjc0k/yapi-to-typescript/commit/3e0301f))
* 支持 LDAP 登录方式 ([bbb07fb](https://github.com/fjc0k/yapi-to-typescript/commit/bbb07fb))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.5.0...v0.6.0) (2019-01-09)


### Features

* 完善测试 ([f070639](https://github.com/fjc0k/yapi-to-typescript/commit/f070639))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.4.2...v0.5.0) (2019-01-09)


### Features

* 优化 ([8dfe154](https://github.com/fjc0k/yapi-to-typescript/commit/8dfe154))
* 增加一些辅助工具 ([db1f1de](https://github.com/fjc0k/yapi-to-typescript/commit/db1f1de))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.4.1...v0.4.2) (2018-12-26)


### Bug Fixes

* res_body 可能为空 ([2cfd029](https://github.com/fjc0k/yapi-to-typescript/commit/2cfd029))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.4.0...v0.4.1) (2018-12-11)


### Bug Fixes

* tsc 生成的 lib 有误 ([231e916](https://github.com/fjc0k/yapi-to-typescript/commit/231e916))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.3.0...v0.4.0) (2018-12-10)


### Features

* 支持 init 初始化配置文件 ([709fbbf](https://github.com/fjc0k/yapi-to-typescript/commit/709fbbf))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.4...v0.3.0) (2018-12-10)


### Features

* 暴露些常用的 API ([f23bf9c](https://github.com/fjc0k/yapi-to-typescript/commit/f23bf9c))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.3...v0.2.4) (2018-12-07)


### Bug Fixes

* 使用 LF 换行符 (closes: [#2](https://github.com/fjc0k/yapi-to-typescript/issues/2)) ([c5c87fb](https://github.com/fjc0k/yapi-to-typescript/commit/c5c87fb))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.2...v0.2.3) (2018-12-01)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.1...v0.2.2) (2018-11-30)



<a name="0.2.1"></a>
## [0.2.1](https://github.com/fjc0k/yapi-to-typescript/compare/v0.2.0...v0.2.1) (2018-11-30)


### Bug Fixes

* types ([ad1d915](https://github.com/fjc0k/yapi-to-typescript/commit/ad1d915))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/fjc0k/yapi-to-typescript/compare/v0.1.0...v0.2.0) (2018-11-30)


### Bug Fixes

* 将 additionalProperties 设为 false ([f78d7e6](https://github.com/fjc0k/yapi-to-typescript/commit/f78d7e6))
* 目标代码应为 es5 以兼容浏览器 ([76e68eb](https://github.com/fjc0k/yapi-to-typescript/commit/76e68eb))


### Features

* data 接口为 any 时，将其设为可选 ([50b7e21](https://github.com/fjc0k/yapi-to-typescript/commit/50b7e21))
* 优化 dataKey 支持 ([cf5d1de](https://github.com/fjc0k/yapi-to-typescript/commit/cf5d1de))
* 添加 FileData 文件包装器 ([8291e90](https://github.com/fjc0k/yapi-to-typescript/commit/8291e90))



<a name="0.1.0"></a>
# 0.1.0 (2018-11-29)


### Features

* 初始化项目 ([fd23263](https://github.com/fjc0k/yapi-to-typescript/commit/fd23263))
