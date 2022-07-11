import getAvailablePort from 'get-port'
import http from 'http'
import onExit from 'signal-exit'
import url from 'url'
import { AsyncReturnType } from 'vtils/types'
import { httpGet } from './utils'
import { isEmpty } from 'vtils'
import { swaggerJsonToYApiData } from './swaggerJsonToYApiData'
import { OpenAPIV2 as SwaggerType } from 'openapi-types'

export interface SwaggerToYApiServerOptions {
  swaggerJsonUrl: string
}

export class SwaggerToYApiServer {
  private port = 0

  private swaggerJson: SwaggerType.Document = {} as any

  private httpServer: http.Server | null = null

  private yapiData: AsyncReturnType<typeof swaggerJsonToYApiData> = {} as any

  constructor(private readonly options: SwaggerToYApiServerOptions) {}

  async getPort(): Promise<number> {
    if (this.port === 0) {
      this.port = await getAvailablePort({
        port: 50505,
      })
    }
    return this.port
  }

  async getUrl(): Promise<string> {
    return `http://127.0.0.1:${await this.getPort()}`
  }

  async getSwaggerJson(): Promise<SwaggerType.Document> {
    if (isEmpty(this.swaggerJson)) {
      const res = await httpGet<SwaggerType.Document>(
        this.options.swaggerJsonUrl,
      )
      this.swaggerJson = res
    }
    return this.swaggerJson
  }

  async getYApiData(): Promise<AsyncReturnType<typeof swaggerJsonToYApiData>> {
    if (isEmpty(this.yapiData)) {
      this.yapiData = await swaggerJsonToYApiData(await this.getSwaggerJson())
    }
    return this.yapiData
  }

  async start(): Promise<string> {
    const yapiData = await this.getYApiData()
    // eslint-disable-next-line no-async-promise-executor
    await new Promise<void>(async resolve => {
      this.httpServer = http
        .createServer(async (req, res) => {
          const { pathname } = url.parse(req.url || '')
          res.setHeader('Content-Type', 'application/json')
          if (pathname!.includes('/api/plugin/export')) {
            res.end(
              JSON.stringify(
                yapiData.cats.map(cat => ({
                  ...cat,
                  list: yapiData.interfaces.filter(
                    item => item.catid === cat._id,
                  ),
                })),
              ),
            )
          } else if (pathname!.includes('/api/interface/getCatMenu')) {
            res.end(
              JSON.stringify({
                errcode: 0,
                errmsg: '成功！',
                data: yapiData.cats,
              }),
            )
          } else if (pathname!.includes('/api/project/get')) {
            res.end(
              JSON.stringify({
                errcode: 0,
                errmsg: '成功！',
                data: yapiData.project,
              }),
            )
          } else {
            res.end('404')
          }
        })
        .listen(await this.getPort(), '127.0.0.1', () => {
          onExit(() => this.stop())
          resolve()
        })
    })
    return this.getUrl()
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        resolve()
      } else {
        this.httpServer.close(err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }
    })
  }
}
