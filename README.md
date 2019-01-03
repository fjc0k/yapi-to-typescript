<p align="center">
  <img src="./logo.svg" width="150" />
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

安装完成后，我们就可以使用 `ytt` 命令进行相关操作。

### 生成配置文件

在使用前，我们应该在项目的根目录写入配置文件 `ytt.config.ts`，使用命令 `ytt init` 可快速创建配置文件，如果配置文件已存在，将会被覆盖：

```bash
# yarn
yarn ytt init

# 或者，npx
npx ytt init

# 或者，npm
npm run ytt init
```
