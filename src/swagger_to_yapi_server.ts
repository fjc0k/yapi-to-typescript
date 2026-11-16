import http from 'node:http';
import url from 'node:url';
import getAvailablePort from 'get-port';
import type { OpenAPIV2 as SwaggerType } from 'openapi-types';
import { onExit } from 'signal-exit';
import { isEmpty } from 'vtils';
import type { AsyncReturnType } from 'vtils/types';
import { swaggerJsonToYApiData } from './swagger_json_to_yapi_data.ts';
import { httpGet } from './utils.ts';

export interface SwaggerToYApiServerOptions {
  swaggerJsonUrl: string;
}

export class SwaggerToYApiServer {
  private port = 0;

  private swaggerJson: SwaggerType.Document = {} as any;

  private httpServer: http.Server | null = null;

  private yapiData: AsyncReturnType<typeof swaggerJsonToYApiData> = {} as any;

  constructor(private readonly options: SwaggerToYApiServerOptions) {}

  async getPort(): Promise<number> {
    if (this.port === 0) {
      this.port = await getAvailablePort({
        port: 50505,
      });
    }
    return this.port;
  }

  async getUrl(): Promise<string> {
    return `http://127.0.0.1:${await this.getPort()}`;
  }

  async getSwaggerJson(): Promise<SwaggerType.Document> {
    if (isEmpty(this.swaggerJson)) {
      const res = await httpGet<SwaggerType.Document>(
        this.options.swaggerJsonUrl,
      );
      this.swaggerJson = res;
    }
    return this.swaggerJson;
  }

  async getYApiData(): Promise<AsyncReturnType<typeof swaggerJsonToYApiData>> {
    if (isEmpty(this.yapiData)) {
      this.yapiData = await swaggerJsonToYApiData(await this.getSwaggerJson());
    }
    return this.yapiData;
  }

  async start(): Promise<string> {
    const yapiData = await this.getYApiData();
    const port = await this.getPort();
    await new Promise<void>(resolve => {
      this.httpServer = http
        .createServer(async (req, res) => {
          const { pathname } = url.parse(req.url || '');
          res.setHeader('Content-Type', 'application/json');
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
            );
          } else if (pathname!.includes('/api/interface/getCatMenu')) {
            res.end(
              JSON.stringify({
                errcode: 0,
                errmsg: '成功！',
                data: yapiData.cats,
              }),
            );
          } else if (pathname!.includes('/api/project/get')) {
            res.end(
              JSON.stringify({
                errcode: 0,
                errmsg: '成功！',
                data: yapiData.project,
              }),
            );
          } else {
            res.end('404');
          }
        })
        .listen(port, '127.0.0.1', () => {
          onExit(() => {
            this.stop();
          });
          resolve();
        });
    });
    return this.getUrl();
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        resolve();
      } else {
        this.httpServer.close(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }
}
