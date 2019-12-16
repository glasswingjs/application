import 'reflect-metadata'

import {registerRouter} from '@glasswing/router'
import {expect} from 'chai'
import {container} from 'tsyringe'
// import fetch from 'node-fetch'

import {Application, registerHttpServerFactory} from '../src'
import {TestController} from './controller'

registerRouter()
registerHttpServerFactory()

describe('@glasswing/application', () => {
  describe('Application (initiatlization)', () => {
    it('.. ServerFactory::inject() => Should return an object', () => {
      expect(container.resolve('ServerFactory')).to.be.an('object')
    })

    it('.. Router::inject() => Should return an object', () => {
      // expect(container.resolve('Router')).to.be.an('object')
    })

    it('::constructor() => Should return an object', () => {
      // const app: Application = new Application(
      //   container.resolve('ServerFactory'),
      //   container.resolve('Router')
      // )
      // expect(app).to.be.an('object')
      // expect(app instanceof Application).to.be.true
    })

    // it('::inject() => Should return an object', () => {
    //   const app: Application = container.resolve(Application)

    //   expect(app).to.be.an('object')
    //   expect(app instanceof Application).to.be.true
    // })
  })

  describe('src/application => Application', () => {
    let application: Application
    let controller: TestController

    // before(() => {
    //   application = container.resolve(Application)
    //   application.registerControllers([container.resolve(TestController)])
    // })

    // it('Application::constructor() will return an object', () => {
    //   expect(application).to.be.an('object')
    // })

    // it('Application::registeredRoutes() will return an array', () => {
    //   expect(application.registeredRoutes()).to.be.an('array')
    //   expect(application.registeredRoutes().length).to.equal(
    //     Reflect.getMetadata('routeRegistry', new TestController()).routes.length,
    //   )
    // })

    // it('Application::start()/stop() will start, then stop the server', done => {
    //   application.start().then(() => application.stop().then(done))
    // })
  })

  // describe('lib/server/server-express => fetch', () => {
  //   let server: ExpressServer
  //   let controller: TestController
  //   let url: string = ''

  //   before(() => {
  //     registerYamlConfig('./config.yml.template')
  //     registerExpressServer()
  //     controller = resolve(TestController)
  //     server = container.resolve('Server')
  //     server.registerControllers([controller])
  //     server.start()

  //     url = `http://localhost:${(resolve('Config') as Config).get('server.port')}`
  //   })

  //   after(() => {
  //     server.stop()
  //   })

  //   it('fetch(/no-args-all) GET', done => {
  //     fetch(`${url}/no-args-all`)
  //       .then(async res => res.text())
  //       .then(body => {
  //         expect(body).to.equal('noArgsAll')
  //         done()
  //       })
  //   })

  //   it('fetch(/no-args-all) POST', done => {
  //     fetch(`${url}/no-args-all`, {method: 'POST'})
  //       .then(async res => res.text())
  //       .then(body => {
  //         expect(body).to.equal('noArgsAll')
  //         done()
  //       })
  //   })

  //   it('fetch(/no-args-post)', done => {
  //     fetch(`${url}/no-args-post`, {method: 'POST'})
  //       .then(async res => res.text())
  //       .then(body => {
  //         expect(body).to.equal('noArgsPost')
  //         done()
  //       })
  //   })
  // })
})
