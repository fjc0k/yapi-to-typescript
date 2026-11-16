import notifyDingTalk from 'notify-dingtalk';
import { dedent } from 'vtils';

const { defineConfig, getLatestConventionalChangelog } = notifyDingTalk;

export default defineConfig({
  title: '发布公告',
  content: dedent`
    # 发布公告

    ---

    ${getLatestConventionalChangelog('./CHANGELOG.md')}

    ---

    [进入主页→](https://github.com/fjc0k/yapi-to-typescript)
  `,
});
