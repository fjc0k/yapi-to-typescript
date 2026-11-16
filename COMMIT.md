# Git Commit 提交规范

生成 Git Commit Message 时，必须严格遵循 Conventional Commits（约定式提交规范）。

## 1. 提交格式

`<type>(<scope>): <description>`

例如：

- `feat(x-server): 新增 WebSocket 支持`
- `fix(x-request): 修复请求重试失败的问题`
- `refactor(core): 简化插件注册逻辑`

## 2. 语言要求

- **Commit Message 必须使用简体中文。**
- `type` 必须使用规范规定的英文小写标识，例如 `feat`、`fix`、`refactor`。
- `scope` 使用受影响的 package 名称或模块名称，保持简洁。
- `description` 必须使用中文，准确描述本次变更。
- 不要使用英文句子描述提交内容。
- 技术术语、API 名称、库名称、变量名可以保留英文。

## 3. 提交类型

| 类型     | 说明                             |
| -------- | -------------------------------- |
| feat     | 新增功能                         |
| fix      | 修复 Bug                         |
| docs     | 文档修改                         |
| style    | 代码格式调整，不影响逻辑         |
| refactor | 代码重构，不新增功能或修复 Bug   |
| perf     | 性能优化                         |
| test     | 添加或修改测试                   |
| build    | 构建系统、构建配置及构建依赖调整 |
| ci       | CI/CD 配置修改                   |
| chore    | 其他日常维护工作                 |
| revert   | 回滚之前的提交                   |

## 4. Scope 规则

- 对于**新增、删除**的文件，无需 scope。
- 对于**修改**的文件，scope 优先取文件的主要内容名（如主要类名、模块名等）。

## 5. Description 规则

- 使用简洁、明确的中文描述。
- 使用动宾结构，直接说明做了什么。
- 不要添加句号。
- 不要写模糊描述，例如「优化代码」「修改逻辑」「更新内容」。
- 不要臆造 Diff 中不存在的变更。
- 优先使用一行描述完整提交内容。

## 6. 破坏性变更

存在不兼容变更时，使用 `!` 标记：

`feat(x-server)!: 移除旧版插件注册接口`

必要时在提交正文中使用：

`BREAKING CHANGE: 移除了旧版插件注册接口，必须迁移到新的注册方式`

## 7. 生成要求

- 必须检查本次实际提交的 Diff。
- 根据主要变更选择最合适的 type。
- 不要因为修改了多个文件就生成多个提交类型。
- 优先生成一条最能概括本次变更的 Commit Message。
- 最终只生成 Commit Message，不要附加解释或 Markdown 代码块。
