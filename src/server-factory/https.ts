import {Request, Response} from '@glasswing/http'
import {RouterCallable} from '@glasswing/router'
import * as https from 'https'
import {container} from 'tsyringe'

import {HttpOrHttpsServer} from './_types'
import {HttpServerFactory} from './http'

export class HttpsServerFactory extends HttpServerFactory {
  public create(router: RouterCallable, options: https.ServerOptions = {}): HttpOrHttpsServer {
    return https.createServer(options, (req: Request, res: Response) => {
      router(req, res)
    })
  }
}

export const registerHttpsServerFactory = () =>
  container.register('ServerFactory', {
    useFactory: () => new HttpsServerFactory(),
  })
