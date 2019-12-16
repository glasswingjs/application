import 'reflect-metadata';
import { Injectable, Inject } from '@glasswing/common';
import { RouteRegistry } from '@glasswing/router';
import { HttpRequest, Http2Request } from '@glasswing/http';
import http from 'http';
import https from 'https';
import { container } from 'tsyringe';
import http2 from 'http2';

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
let Application = class Application {
    constructor(serverFactory) {
        this.serverFactory = serverFactory;
        this.port = 3000;
        this.retries = 1;
        this.retriesMax = 10;
        this.routeRegistry = new RouteRegistry();
    }
};
Application = __decorate([
    Injectable(),
    __param(0, Inject('ServerFactory')),
    __metadata("design:paramtypes", [Object])
], Application);
// export const registerApplication = () => container.register('Application', {
//   useFactory: () => container.resolve(Application)
// })

class HttpServerFactory {
    create(router, options = {}, useHttps) {
        return useHttps
            ? https.createServer(options, (req, res) => {
                router(HttpRequest.fromIncommingMessage(req), res);
            })
            : http.createServer(options, (req, res) => {
                router(HttpRequest.fromIncommingMessage(req), res);
            });
    }
}
const registerHttpServerFactory = () => container.register('ServerFactory', {
    useClass: HttpServerFactory,
});

class Http2ServerFactory {
    create(router, options = {}, useHttps) {
        return useHttps
            ? http2.createSecureServer(options, (req, res) => {
                router(Http2Request.fromIncommingMessage(req), res);
            })
            : http2.createServer(options, (req, res) => {
                router(Http2Request.fromIncommingMessage(req), res);
            });
    }
}
const registerHttp2ServerFactory = () => container.register('ServerFactory', {
    useClass: Http2ServerFactory,
});

export { Application, Http2ServerFactory, HttpServerFactory, registerHttp2ServerFactory, registerHttpServerFactory };
