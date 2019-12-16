(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('reflect-metadata'), require('@glasswing/router'), require('tsyringe'), require('@glasswing/http'), require('http'), require('https'), require('http2')) :
    typeof define === 'function' && define.amd ? define(['exports', 'reflect-metadata', '@glasswing/router', 'tsyringe', '@glasswing/http', 'http', 'https', 'http2'], factory) :
    (global = global || self, factory((global.gw = global.gw || {}, global.gw.common = {}), null, global.router, global.tsyringe, global.http, global.http$1, global.https, global.http2));
}(this, (function (exports, reflectMetadata, router, tsyringe, http, http$1, https, http2) { 'use strict';

    http$1 = http$1 && http$1.hasOwnProperty('default') ? http$1['default'] : http$1;
    https = https && https.hasOwnProperty('default') ? https['default'] : https;
    http2 = http2 && http2.hasOwnProperty('default') ? http2['default'] : http2;

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

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    exports.Application = class Application {
        constructor(
        // @inject('Config') protected config: Config,
        serverFactory, router$1) {
            this.serverFactory = serverFactory;
            this.router = router$1;
            this.port = 3000;
            this.retries = 1;
            this.retriesMax = 10;
            this.routeRegistry = new router.RouteRegistry();
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
        start(port = 3000, host) {
            return __awaiter(this, void 0, void 0, function* () {
                this.retries = 1;
                this.port = 3000;
                this.host = host;
                // TODO: better way to do this ?
                // this.server = this.serverFactory.create((this.router as any) as HttpRouteHandler)
                yield this.tryStart();
                // TODO: Add error for this
                // @link https://nodejs.org/api/http.html#http_event_clienterror
                // this.server.on('clientError', (err, socket) => {
                //   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
                // })
            });
        }
        /**
         *
         * @returns {Promise<void>}
         */
        stop() {
            return __awaiter(this, void 0, void 0, function* () {
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
    exports.Application = __decorate([
        tsyringe.injectable(),
        __param(0, tsyringe.inject('ServerFactory')),
        __param(1, tsyringe.inject('Router')),
        __metadata("design:paramtypes", [Object, Object])
    ], exports.Application);
    // export const registerApplication = () => container.register('Application', {
    //   useFactory: () => container.resolve(Application)
    // })

    class HttpServerFactory {
        create(router, options = {}, useHttps) {
            return useHttps
                ? https.createServer(options, (req, res) => {
                    router(http.HttpRequest.fromIncommingMessage(req), res);
                })
                : http$1.createServer(options, (req, res) => {
                    router(http.HttpRequest.fromIncommingMessage(req), res);
                });
        }
    }
    const registerHttpServerFactory = () => tsyringe.container.register('ServerFactory', {
        useClass: HttpServerFactory,
    });

    class Http2ServerFactory {
        create(router, options = {}, useHttps) {
            return useHttps
                ? http2.createSecureServer(options, (req, res) => {
                    router(http.Http2Request.fromIncommingMessage(req), res);
                })
                : http2.createServer(options, (req, res) => {
                    router(http.Http2Request.fromIncommingMessage(req), res);
                });
        }
    }
    const registerHttp2ServerFactory = () => tsyringe.container.register('ServerFactory', {
        useClass: Http2ServerFactory,
    });

    exports.Http2ServerFactory = Http2ServerFactory;
    exports.HttpServerFactory = HttpServerFactory;
    exports.registerHttp2ServerFactory = registerHttp2ServerFactory;
    exports.registerHttpServerFactory = registerHttpServerFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
