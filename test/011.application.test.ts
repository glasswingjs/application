import 'reflect-metadata'

import {getControllerPathMappings, registerRouter} from '@glasswing/router'
import {registerYamlConfig} from '@glasswing/config'
import {expect} from 'chai'
import {container} from 'tsyringe'
// import fetch from 'node-fetch'

import {Application, registerHttpServerFactory} from '../src'
import {TestController} from './controller'

describe('@glasswing/application', () => {
  describe('Application (initiatlization)', () => {
    before(() => {
      registerYamlConfig('./test/config.yaml', container)
      registerRouter(container)
      registerHttpServerFactory(container)
    })

    after(() => {
      container.reset()
    })

    it('.. YamlConfig::inject() => Should return an object', () => {
      expect(container.resolve('Config')).to.be.an('object')
    })

    it('.. ServerFactory::inject() => Should return an object', () => {
      expect(container.resolve('ServerFactory')).to.be.an('object')
    })

    it('.. Router::inject() => Should return an object', () => {
      expect(container.resolve('Router')).to.be.an('object')
    })

    it('::constructor() => Should return an object', () => {
      const app: Application = new Application(
        container.resolve('Config'),
        container.resolve('ServerFactory'),
        container.resolve('Router'),
      )
      expect(app).to.be.an('object')
      expect(app instanceof Application).to.be.true
    })

    it('::inject() => Should return an object', () => {
      const app: Application = container.resolve(Application)

      expect(app).to.be.an('object')
      expect(app instanceof Application).to.be.true
    })
  })

  describe('Application (routing & start/stop)', () => {
    let application: Application
    let controller: TestController

    before(() => {
      registerYamlConfig('./test/config.yaml', container)
      registerRouter(container)
      registerHttpServerFactory(container)
      application = container.resolve(Application)
      application.registerControllers([container.resolve(TestController)])
    })

    after(() => {
      container.reset()
    })

    it('::registeredRoutes() will return an array', () => {
      expect(application.registeredRoutes()).to.be.an('array')
      expect(application.registeredRoutes().length).to.equal(
        getControllerPathMappings(new TestController()).routes.length,
      )
    })

    it('::start()/stop() will start, then stop the server', done => {
      application.start().then(() => application.stop().then(done))
    })
  })

  // describe('lib/server/server-express => fetch', () => {
  //   let application: Application
  //   let controller: TestController
  //   let url: string = ''

  //   before(() => {
  //     registerRouter(container)
  //     registerHttpServerFactory(container)
  //     application = container.resolve(Application)
  //     application.registerControllers([container.resolve(TestController)])
  //     application.start()

  //     // url = `http://localhost:${(resolve('Config') as Config).get('server.port')}`
  //   })

  //   after(() => {
  //     application.stop()
  //   })

  //   // it('fetch(/no-args-all) GET', done => {
  //   //   fetch(`${url}/no-args-all`)
  //   //     .then(async res => res.text())
  //   //     .then(body => {
  //   //       expect(body).to.equal('noArgsAll')
  //   //       done()
  //   //     })
  //   // })

  // //   it('fetch(/no-args-all) POST', done => {
  // //     fetch(`${url}/no-args-all`, {method: 'POST'})
  // //       .then(async res => res.text())
  // //       .then(body => {
  // //         expect(body).to.equal('noArgsAll')
  // //         done()
  // //       })
  // //   })

  // //   it('fetch(/no-args-post)', done => {
  // //     fetch(`${url}/no-args-post`, {method: 'POST'})
  // //       .then(async res => res.text())
  // //       .then(body => {
  // //         expect(body).to.equal('noArgsPost')
  // //         done()
  // //       })
  // //   })
  // })
})
