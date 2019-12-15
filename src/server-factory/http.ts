import {HttpRequest, HttpResponse} from '@glasswing/http'
import {HttpRouteHandler} from '@glasswing/router'
import http from 'http'
import https from 'https'
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
  create(router: HttpRouteHandler, options?: HttpOrHttpsServerOptions, useHttps?: boolean): HttpOrHttpsServer
}

export class HttpServerFactory {
  public create(router: HttpRouteHandler, options: http.ServerOptions = {}, useHttps?: boolean): HttpOrHttpsServer {
    return useHttps
      ? https.createServer(options, (req: http.IncomingMessage, res: http.ServerResponse) => {
          router(HttpRequest.fromIncommingMessage(req), res)
        })
      : http.createServer(options, (req: http.IncomingMessage, res: http.ServerResponse) => {
          router(HttpRequest.fromIncommingMessage(req), res)
        })
  }
}

export const registerHttpServerFactory = () =>
  container.register('ServerFactory', {
    useClass: HttpServerFactory,
  })
