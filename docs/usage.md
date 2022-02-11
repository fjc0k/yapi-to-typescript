---
toc: menu
order: 3
---

# 使用

## 生成代码

使用以下命令生成代码：

```bash
npx ytt
```

如果要使用自定义的配置文件：

```bash
npx ytt -c config/ytt.ts
```

## 编写统一请求函数

见[统一请求函数](./request.html)。

## 调用接口请求函数

从 [outputFilePath](./config.html#outputfilepath) 导入你要调用的接口请求函数即可，接口请求函数的名称由配置 [getRequestFunctionName](./config.html#getrequestfunctionname) 决定，如：

```typescript
import { getUserInfo } from '../api'

const updateUserInfo = async () => {
  const userInfo = await getUserInfo({
    id: 1,
  })
  console.log(userInfo)
}
```

## 调用上传文件类接口

对于上传文件类接口，你需要将文件包装为一个 FileData 实例，如：

```typescript
import { FileData } from 'yapi-to-typescript'
import { uploadFile } from '../api'

const changeAvatar = async (file: File) => {
  const res = await uploadFile({
    type: 'avatar',
    file: new FileData(file),
  })
  console.log(res)
}
```

## 获取接口的请求数据、返回数据类型

如果你没动过 [getRequestDataTypeName](./config.html#getrequestdatatypename)、[getResponseDataTypeName](./config.html#getresponsedatatypename) 这两个配置，默认情况下，你可以这样获取接口的请求数据、返回数据类型：

```typescript
import { getUserInfo, GetUserInfoRequest, GetUserInfoResponse } from '../api'

interface CustomUserInfo extends GetUserInfoResponse {
  gender: 'male' | 'female' | 'unknown'
}

const customGetUserInfo = async (
  payload: GetUserInfoRequest,
): Promise<CustomUserInfo> => {
  const userInfo = await getUserInfo(payload)
  return {
    ...userInfo,
    gender:
      userInfo.sexy === 1 ? 'male' : userInfo.sexy === 2 ? 'female' : 'unknown',
  }
}
```

如果你只想获得请求数据、返回数据下某个字段的类型，可以这样做：

```typescript
import { GetUserInfoResponse } from '../api'

type UserRole = GetUserInfoResponse['role']
```

## 命令行钩子 <Badge>3.31.0+</Badge>

可使用钩子在生成成功、失败、完毕时进行相关操作。

```typescript
import { defineConfig } from 'yapi-to-typescript'

export default defineConfig(
  {
    // 生成配置
  },

  // 钩子
  {
    success() {
      // 生成成功时触发
    },
    fail() {
      // 生成失败时触发
    },
    complete() {
      // 生成完毕时触发（无论成功、失败）
    },
  },
)
```
