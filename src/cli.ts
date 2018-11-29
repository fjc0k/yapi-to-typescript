#!/usr/bin/env node

require('ts-node').register({ transpileOnly: true })

import fs from 'fs-extra'
import { Config } from './types'
import toTs from './index'

const cwd = process.cwd()

const configTsFile = `${cwd}/ytt.config.ts`
const configJsFile = `${cwd}/ytt.config.js`

let config: Config = {} as any

switch (true) {
  case fs.existsSync(configTsFile):
    config = require(configTsFile).default
    break
  case fs.existsSync(configJsFile):
    config = require(configJsFile)
    break
  default:
    throw new Error('请先设置 ytt.config.{ts|js} 文件。')
}

(async () => {
  await toTs(config)
})()
