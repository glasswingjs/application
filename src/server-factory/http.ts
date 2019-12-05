import {Request, Response} from '@glasswing/http'
import {RouterCallable} from '@glasswing/router'
import http from 'http'
import {container} from 'tsyringe'

import {HttpOrHttpsServer, HttpOrHttpsServerOptions} from './_types'

/**
 * @see https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/
 * @see https://nodejs.org/api/http.html#http_event_request
 * @see https://nodejs.org/api/https.html#https_server_listen
 * @see https://nodejs.org/api/http2.html
 * @see https://nodejs.org/api/net.html
 */
export interface ServerFactory {
  create(router: RouterCallable, options?: HttpOrHttpsServerOptions): HttpOrHttpsServer
}

export class HttpServerFactory {
  public create(router: RouterCallable, options: http.ServerOptions = {}): HttpOrHttpsServer {
    return http.createServer(options, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttpServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpServerFactory(),
  })
