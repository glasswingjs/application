import {Request, Response} from '@glasswing/http'
import {RouterCallable} from '@glasswing/router'
import * as http2 from 'http2'
import {container} from 'tsyringe'

import {HttpOrHttpsServer} from './_types'
import {Http2ServerFactory} from './http2'

export class Https2ServerFactory extends Http2ServerFactory {
  public create(router: RouterCallable, options: http2.SecureServerOptions = {}): HttpOrHttpsServer {
    return http2.createSecureServer(options, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttps2ServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new Https2ServerFactory(),
  })
