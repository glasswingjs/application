define('index', ['exports', 'reflect-metadata', '@glasswing/common', '@glasswing/router', '@glasswing/http', 'http', 'https', 'tsyringe', 'http2'], function (exports, reflectMetadata, common, router, http, http$1, https, tsyringe, http2) { 'use strict';

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

    // @Inject('Config') protected config: Config
    // @Inject('ServerFactory') protected serverFactory: ServerFactory,
    // @Inject('Router') protected router: Router,
    var Application = /** @class */ (function () {
        function Application(serverFactory) {
            this.serverFactory = serverFactory;
            this.port = 3000;
            this.retries = 1;
            this.retriesMax = 10;
            this.routeRegistry = new router.RouteRegistry();
        }
        Application = __decorate([
            common.Injectable(),
            __param(0, common.Inject('ServerFactory')),
            __metadata("design:paramtypes", [Object])
        ], Application);
        return Application;
    }());
    // export const registerApplication = () => container.register('Application', {
    //   useFactory: () => container.resolve(Application)
    // })

    var HttpServerFactory = /** @class */ (function () {
        function HttpServerFactory() {
        }
        HttpServerFactory.prototype.create = function (router, options, useHttps) {
            if (options === void 0) { options = {}; }
            return useHttps
                ? https.createServer(options, function (req, res) {
                    router(http.HttpRequest.fromIncommingMessage(req), res);
                })
                : http$1.createServer(options, function (req, res) {
                    router(http.HttpRequest.fromIncommingMessage(req), res);
                });
        };
        return HttpServerFactory;
    }());
    var registerHttpServerFactory = function () {
        return tsyringe.container.register('ServerFactory', {
            useClass: HttpServerFactory,
        });
    };

    var Http2ServerFactory = /** @class */ (function () {
        function Http2ServerFactory() {
        }
        Http2ServerFactory.prototype.create = function (router, options, useHttps) {
            if (options === void 0) { options = {}; }
            return useHttps
                ? http2.createSecureServer(options, function (req, res) {
                    router(http.Http2Request.fromIncommingMessage(req), res);
                })
                : http2.createServer(options, function (req, res) {
                    router(http.Http2Request.fromIncommingMessage(req), res);
                });
        };
        return Http2ServerFactory;
    }());
    var registerHttp2ServerFactory = function () {
        return tsyringe.container.register('ServerFactory', {
            useClass: Http2ServerFactory,
        });
    };

    exports.Application = Application;
    exports.Http2ServerFactory = Http2ServerFactory;
    exports.HttpServerFactory = HttpServerFactory;
    exports.registerHttp2ServerFactory = registerHttp2ServerFactory;
    exports.registerHttpServerFactory = registerHttpServerFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

});
