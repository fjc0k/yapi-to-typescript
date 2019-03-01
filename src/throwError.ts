import chalk from 'chalk'

/**
 * 抛出错误。
 *
 * @param msg 错误信息
 */
export default function throwError(...msg: string[]): never {
  throw new Error(chalk.red(msg.join('')))
}
