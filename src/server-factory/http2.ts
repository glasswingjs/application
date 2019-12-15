import {Http2Request, Http2Response} from '@glasswing/http'
import {HttpRouteHandler} from '@glasswing/router'
import http2 from 'http2'

import {HttpOrHttpsServer, HttpOrHttpsServerOptions} from './_types'
import {ServerFactory} from './http'

export class HttpServerFactory {
  public create(router: HttpRouteHandler, options: http2.ServerOptions = {}, useHttps?: boolean): HttpOrHttpsServer {
    return useHttps
      ? http2.createSecureServer(options, (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
          router(Http2Request.fromIncommingMessage(req), res)
        })
      : http2.createServer(options, (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
          router(Http2Request.fromIncommingMessage(req), res)
        })
  }
}

export const registerHttpServerFactory = () =>
  container.register('ServerFactory', {
    useClass: HttpServerFactory,
  })
