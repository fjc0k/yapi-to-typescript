import crypto from 'crypto'
import fs from 'fs-extra'
import got from 'got'
import { dedent } from 'vtils'
import { join } from 'path'

async function main(
  robots: Array<{
    name: string
    accessToken: string
    secret: string
    atMobiles?: string[]
  }>,
) {
  const changelogFile = join(__dirname, '../CHANGELOG.md')
  const changelogFullContent = await fs.readFile(changelogFile, 'utf8')
  const changelogContent =
    changelogFullContent.match(/\n(#+ [[\d].+?)\n*#+ [[\d]/s)?.[1] ??
    changelogFullContent.match(/\n(#+ [\d].+?)\n*$/s)![1]
  await Promise.all(
    robots.map(async ({ accessToken, secret, atMobiles = [] }) => {
      const timestamp = Date.now()
      const sign = crypto
        .createHmac('sha256', secret)
        .update(`${timestamp}\n${secret}`)
        .digest('base64')
      const { body } = await got.post('https://oapi.dingtalk.com/robot/send', {
        searchParams: {
          access_token: accessToken,
          timestamp: timestamp,
          sign: sign,
        },
        json: {
          msgtype: 'markdown',
          markdown: {
            title: '发布公告',
            text: dedent`
              # 发布公告

              ${atMobiles.map(mobile => `@${mobile}`).join(' ')}

              ---

              ${changelogContent}

              ---

              [进入主页→](https://github.com/fjc0k/yapi-to-typescript)
            `,
          },
          at: {
            atMobiles: atMobiles,
            isAtAll: false,
          },
        },
      })
      console.log(body)
    }),
  )
}

main([
  {
    name: 'YTT',
    accessToken: process.env.D_ACCESS_TOKEN!,
    secret: process.env.D_SECRET!,
  },
])
