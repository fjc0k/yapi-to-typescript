const {
  defineConfig,
  getLatestConventionalChangelog,
} = require('notify-dingtalk')
const { dedent } = require('vtils')

module.exports = defineConfig({
  title: '发布公告',
  content: dedent`
    # 发布公告

    ---

    ${getLatestConventionalChangelog('./CHANGELOG.md')}

    ---

    [进入主页→](https://github.com/fjc0k/yapi-to-typescript)
  `,
})
