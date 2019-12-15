import 'reflect-metadata'

import {expect} from 'chai'
import {Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'
// import {Http2Server, Http2SecureServer} from 'http2'
import {Server} from 'net'
import {container} from 'tsyringe'

// import {registerRouter, HttpRouteHandler} from '@glasswing/router'

import {HttpOrHttpsServer, ServerFactory, HttpServerFactory, registerHttpServerFactory} from '../src'

// registerRouter()

describe('@glasswing/application', () => {
  describe('src/http-server => *ServerFactory', () => {
    let server: HttpOrHttpsServer
    // const router: HttpRouteHandler = container.resolve('Router') as HttpRouteHandler

    it('HttpServerFactory::constructor() will return an object', () => {
      expect(new HttpServerFactory()).to.be.an('object')
    })

    //   it('HttpServerFactory::create(router) will return an instance of http.Server', () => {
    //     server = new HttpServerFactory().create(router)
    //     expect(server).to.be.an('object')
    //     expect(server instanceof Server).to.be.true
    //     expect(server instanceof HttpServer).to.be.true
    //   })

    //   it('HttpsServerFactory::constructor() will return an object', () => {
    //     expect(new HttpsServerFactory()).to.be.an('object')
    //   })

    //   it('HttpsServerFactory::create(router) will return an instance of https.Server', () => {
    //     server = new HttpsServerFactory().create(router)
    //     expect(server).to.be.an('object')
    //     expect(server instanceof Server).to.be.true
    //     expect(server instanceof HttpsServer).to.be.true
    //   })

    //   it('Http2ServerFactory::constructor() will return an object', () => {
    //     expect(new Http2ServerFactory()).to.be.an('object')
    //   })

    //   it('Http2ServerFactory::create(router) will return an instance of http2.Http2Server', () => {
    //     server = new Http2ServerFactory().create(router)
    //     expect(server).to.be.an('object')
    //     expect(server instanceof Server).to.be.true
    //     // TODO:
    //     // expect(server instanceof Http2Server).to.be.true // TypeError: Right-hand side of 'instanceof' is not an object
    //   })

    //   it('Https2ServerFactory::constructor() will return an object', () => {
    //     expect(new Https2ServerFactory()).to.be.an('object')
    //   })

    //   it('Https2ServerFactory::create(router) will return an instance of http2.Http2SecureServer', () => {
    //     server = new Https2ServerFactory().create(router)
    //     expect(server).to.be.an('object')
    //     expect(server instanceof Server).to.be.true
    //     // TODO:
    //     // expect(server instanceof Http2SecureServer).to.be.true // TypeError: Right-hand side of 'instanceof' is not an object
    //   })
  })

  describe('src/http-server => registerHttp.*ServerFactory (@Inject)', () => {
    let factory: ServerFactory | null

    beforeEach(() => {
      container.reset()
      // registerRouter()
      factory = null
    })

    it('HttpServerFactory::inject() will return an object', () => {
      registerHttpServerFactory()
      factory = container.resolve('ServerFactory')
      expect(factory).to.be.an('object')
      expect(factory instanceof HttpServerFactory).to.be.true
    })

    //   it('Http2ServerFactory::inject() will return an object', () => {
    //     registerHttp2ServerFactory()
    //     factory = container.resolve('ServerFactory')
    //     expect(factory).to.be.an('object')
    //     expect(factory instanceof Http2ServerFactory).to.be.true
    //   })

    //   it('Https2ServerFactory::inject() will return an object', () => {
    //     registerHttps2ServerFactory()
    //     factory = container.resolve('ServerFactory')
    //     expect(factory).to.be.an('object')
    //     expect(factory instanceof Https2ServerFactory).to.be.true
    //   })
  })
})
/**/
