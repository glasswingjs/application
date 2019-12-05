import 'reflect-metadata';
import { Injectable, Inject } from '@glasswing/common';
import { RouteRegistry } from '@glasswing/router';
import http from 'http';
import { container } from 'tsyringe';
import { createServer } from 'https';
import { createServer as createServer$1, createSecureServer } from 'http2';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

let Application = class Application {
    constructor(
    // @Inject('Config') protected config: Config
    serverFactory, router, routeRegistry) {
        this.serverFactory = serverFactory;
        this.router = router;
        this.routeRegistry = routeRegistry;
        this.port = 3000;
        this.retries = 1;
        this.retriesMax = 10;
    }
    /**
     * Register a controller to the application
     * @param controller
     */
    registerController(controller) {
        // for now it's enough to store the routes; we'll see what future reserves
        // getControllerPathMappings(controller).routes.forEach((route: Route) => this.routeRegistry.registerRoute(route))
    }
    /**
     * Register a set of controllers to the application
     * @param controllers
     */
    registerControllers(controllers) {
        controllers.forEach((controller) => this.registerController(controller));
    }
    /**
     * Obtain the list of application registered routes
     */
    registeredRoutes() {
        return this.routeRegistry.routes;
    }
    /**
     *
     * @param {number} port
     * @param {string} host
     * @returns {Promise<void>}
     */
    async start(port = 3000, host) {
        this.retries = 1;
        this.port = 3000;
        this.host = host;
        this.server = this.serverFactory.create(this.router); // TODO: better way to do this ?
        await this.tryStart();
        // TODO: Add error for this
        // @link https://nodejs.org/api/http.html#http_event_clienterror
        // this.server.on('clientError', (err, socket) => {
        //   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
        // })
    }
    /**
     *
     * @returns {Promise<void>}
     */
    async stop() {
        return new Promise((resolve, reject) => {
            if (!this.server) {
                throw new Error('There is no server to stop. Please use .start() method first.');
            }
            this.server.close((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
    /**
     *
     * @returns {Promise<void>}
     */
    tryStart() {
        return new Promise((resolve, reject) => {
            if (this.host) {
                // TODO: Add fail log
                console.log(`Starting application on ${this.host}:${this.port}`); // tslint:disable-line no-console
                this.server.listen(this.port, this.host);
            }
            else {
                // tslint:disable-next-line no-console
                console.log(`Starting application on 0.0.0.0:${this.port} (ipv4) or :::${this.port} (ipv6)`);
                this.server.listen(this.port);
            }
            this.server.on('error', (err) => {
                this.server.close();
                if (err.code !== 'EADDRINUSE') {
                    reject(err);
                }
                else {
                    // TODO: Add fail log
                    console.log(`Server failed starting on port: ${this.port}. Port is busy.`); // tslint:disable-line no-console
                    if (this.retries++ < this.retriesMax) {
                        // TODO: Add retry log
                        this.port += 1;
                        console.log(`Retrying with port: ${this.port}.`); // tslint:disable-line no-console
                        setTimeout(() => resolve(this.tryStart()), 500);
                    }
                    else {
                        // TODO: Add fail log
                        console.error(`Max retries exceeded.`); // tslint:disable-line no-console
                        reject(err);
                    }
                }
            });
            this.server.on('listening', () => resolve());
        });
    }
};
Application = __decorate([
    Injectable(),
    __param(0, Inject('ServerFactory')),
    __param(1, Inject('Router')),
    __param(2, Inject(RouteRegistry)),
    __metadata("design:paramtypes", [Object, Object, RouteRegistry])
], Application);

class HttpServerFactory {
    create(router, options = {}) {
        return http.createServer(options, (req, res) => {
            router(req, res);
        });
    }
}
const registerHttpServerFactory = () => container.register('ServerFactory', {
    useFactory: () => new HttpServerFactory(),
});

class HttpsServerFactory extends HttpServerFactory {
    create(router, options = {}) {
        return createServer(options, (req, res) => {
            router(req, res);
        });
    }
}
const registerHttpsServerFactory = () => container.register('ServerFactory', {
    useFactory: () => new HttpsServerFactory(),
});

class Http2ServerFactory {
    create(router, options = {}) {
        return createServer$1(options, (req, res) => {
            router(req, res);
        });
    }
}
const registerHttp2ServerFactory = () => container.register('ServerFactory', {
    useFactory: () => new Http2ServerFactory(),
});

class Https2ServerFactory extends Http2ServerFactory {
    create(router, options = {}) {
        return createSecureServer(options, (req, res) => {
            router(req, res);
        });
    }
}
const registerHttps2ServerFactory = () => container.register('ServerFactory', {
    useFactory: () => new Https2ServerFactory(),
});

export { Application, Http2ServerFactory, HttpServerFactory, Https2ServerFactory, HttpsServerFactory, registerHttp2ServerFactory, registerHttpServerFactory, registerHttps2ServerFactory, registerHttpsServerFactory };
