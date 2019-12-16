import 'reflect-metadata'

import {expect} from 'chai'
import http from 'http'
import http2 from 'http2'
import https from 'https'
import net from 'net'
import {container} from 'tsyringe'

import {Http2Request, Http2Response, HttpRequest, HttpResponse} from '@glasswing/http'
import {HttpRouteHandler} from '@glasswing/router'

import {
  HttpOrHttpsServer,
  ServerFactory,
  Http2ServerFactory,
  HttpServerFactory,
  registerHttp2ServerFactory,
  registerHttpServerFactory,
} from '../src'

const routeHandler: HttpRouteHandler = (req: HttpRequest | Http2Request, res: HttpResponse | Http2Response) => {}

describe('@glasswing/application', () => {
  describe('src/http-server => *ServerFactory', () => {
    let server: HttpOrHttpsServer

    it('HttpServerFactory::constructor() will return an object', () => {
      const factory: HttpServerFactory = new HttpServerFactory()
      expect(factory).to.be.an('object')
      expect(factory instanceof HttpServerFactory).to.be.true
    })

    it('HttpServerFactory::create(router) will return an instance of http.Server', () => {
      server = new HttpServerFactory().create(routeHandler)
      expect(server).to.be.an('object')
      expect(server instanceof http.Server).to.be.true
      expect(server instanceof net.Server).to.be.true
    })

    it('Http2ServerFactory::constructor() will return an object', () => {
      const factory: Http2ServerFactory = new Http2ServerFactory()
      expect(factory).to.be.an('object')
      expect(factory instanceof Http2ServerFactory).to.be.true
    })

    it('Http2ServerFactory::create(router) will return an instance of net.Server', () => {
      server = new Http2ServerFactory().create(routeHandler)
      expect(server).to.be.an('object')
      expect(server instanceof net.Server).to.be.true
    })
  })

  describe('src/http-server => registerHttp.*ServerFactory (@Inject)', () => {
    let factory: ServerFactory | null
    let server: HttpOrHttpsServer | null

    beforeEach(() => {
      container.reset()
      factory = null
      server = null
    })

    it('HttpServerFactory::inject() will return an object', () => {
      registerHttpServerFactory()
      factory = container.resolve('ServerFactory')
      expect(factory).to.be.an('object')
      expect(factory instanceof HttpServerFactory).to.be.true
    })

    it('HttpServerFactory::create(router) will return an instance of http.Server', () => {
      registerHttpServerFactory()
      server = (container.resolve('ServerFactory') as HttpServerFactory).create(routeHandler)
      expect(server).to.be.an('object')
      expect(server instanceof http.Server).to.be.true
      expect(server instanceof net.Server).to.be.true
    })

    it('Http2ServerFactory::inject() will return an object', () => {
      registerHttp2ServerFactory()
      factory = container.resolve('ServerFactory')
      expect(factory).to.be.an('object')
      expect(factory instanceof Http2ServerFactory).to.be.true
    })

    it('Http2ServerFactory::create(router) will return an instance of net.Server', () => {
      registerHttp2ServerFactory()
      server = (container.resolve('ServerFactory') as Http2ServerFactory).create(routeHandler)
      expect(server).to.be.an('object')
      expect(server instanceof net.Server).to.be.true
    })
  })
})
/**/
