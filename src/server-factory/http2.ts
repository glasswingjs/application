import {Request, Response} from '@glasswing/http'
import {RouterCallable} from '@glasswing/router'
import * as http2 from 'http2'
import {container} from 'tsyringe'

import {HttpOrHttpsServer} from './_types'
import {ServerFactory} from './http'

export class Http2ServerFactory implements ServerFactory {
  public create(router: RouterCallable, options: http2.ServerOptions = {}): HttpOrHttpsServer {
    return http2.createServer(options, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttp2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Http2ServerFactory(),
  })
