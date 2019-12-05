System.register(['reflect-metadata', '@glasswing/common', '@glasswing/router', 'http', 'tsyringe', 'https', 'http2'], function (exports) {
    'use strict';
    var Injectable, Inject, RouteRegistry, http, container, createServer, createServer$1, createSecureServer;
    return {
        setters: [function () {}, function (module) {
            Injectable = module.Injectable;
            Inject = module.Inject;
        }, function (module) {
            RouteRegistry = module.RouteRegistry;
        }, function (module) {
            http = module.default;
        }, function (module) {
            container = module.container;
        }, function (module) {
            createServer = module.createServer;
        }, function (module) {
            createServer$1 = module.createServer;
            createSecureServer = module.createSecureServer;
        }],
        execute: function () {

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
            /* global Reflect, Promise */

            var extendStatics = function(d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };

            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }

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

            function __generator(thisArg, body) {
                var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
                return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0: case 1: t = op; break;
                            case 4: _.label++; return { value: op[1], done: false };
                            case 5: _.label++; y = op[1]; op = [0]; continue;
                            case 7: op = _.ops.pop(); _.trys.pop(); continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                                if (t[2]) _.ops.pop();
                                _.trys.pop(); continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
                }
            }

            var Application = exports('Application', /** @class */ (function () {
                function Application(
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
                Application.prototype.registerController = function (controller) {
                    // for now it's enough to store the routes; we'll see what future reserves
                    // getControllerPathMappings(controller).routes.forEach((route: Route) => this.routeRegistry.registerRoute(route))
                };
                /**
                 * Register a set of controllers to the application
                 * @param controllers
                 */
                Application.prototype.registerControllers = function (controllers) {
                    var _this = this;
                    controllers.forEach(function (controller) { return _this.registerController(controller); });
                };
                /**
                 * Obtain the list of application registered routes
                 */
                Application.prototype.registeredRoutes = function () {
                    return this.routeRegistry.routes;
                };
                /**
                 *
                 * @param {number} port
                 * @param {string} host
                 * @returns {Promise<void>}
                 */
                Application.prototype.start = function (port, host) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.retries = 1;
                                    this.port = 3000;
                                    this.host = host;
                                    this.server = this.serverFactory.create(this.router); // TODO: better way to do this ?
                                    return [4 /*yield*/, this.tryStart()
                                        // TODO: Add error for this
                                        // @link https://nodejs.org/api/http.html#http_event_clienterror
                                        // this.server.on('clientError', (err, socket) => {
                                        //   socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
                                        // })
                                    ];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                /**
                 *
                 * @returns {Promise<void>}
                 */
                Application.prototype.stop = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    if (!_this.server) {
                                        throw new Error('There is no server to stop. Please use .start() method first.');
                                    }
                                    _this.server.close(function (err) {
                                        if (err) {
                                            return reject(err);
                                        }
                                        resolve();
                                    });
                                })];
                        });
                    });
                };
                /**
                 *
                 * @returns {Promise<void>}
                 */
                Application.prototype.tryStart = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (_this.host) {
                            // TODO: Add fail log
                            console.log("Starting application on " + _this.host + ":" + _this.port); // tslint:disable-line no-console
                            _this.server.listen(_this.port, _this.host);
                        }
                        else {
                            // tslint:disable-next-line no-console
                            console.log("Starting application on 0.0.0.0:" + _this.port + " (ipv4) or :::" + _this.port + " (ipv6)");
                            _this.server.listen(_this.port);
                        }
                        _this.server.on('error', function (err) {
                            _this.server.close();
                            if (err.code !== 'EADDRINUSE') {
                                reject(err);
                            }
                            else {
                                // TODO: Add fail log
                                console.log("Server failed starting on port: " + _this.port + ". Port is busy."); // tslint:disable-line no-console
                                if (_this.retries++ < _this.retriesMax) {
                                    // TODO: Add retry log
                                    _this.port += 1;
                                    console.log("Retrying with port: " + _this.port + "."); // tslint:disable-line no-console
                                    setTimeout(function () { return resolve(_this.tryStart()); }, 500);
                                }
                                else {
                                    // TODO: Add fail log
                                    console.error("Max retries exceeded."); // tslint:disable-line no-console
                                    reject(err);
                                }
                            }
                        });
                        _this.server.on('listening', function () { return resolve(); });
                    });
                };
                Application = __decorate([
                    Injectable(),
                    __param(0, Inject('ServerFactory')),
                    __param(1, Inject('Router')),
                    __param(2, Inject(RouteRegistry)),
                    __metadata("design:paramtypes", [Object, Object, RouteRegistry])
                ], Application);
                return Application;
            }()));

            var HttpServerFactory = exports('HttpServerFactory', /** @class */ (function () {
                function HttpServerFactory() {
                }
                HttpServerFactory.prototype.create = function (router, options) {
                    if (options === void 0) { options = {}; }
                    return http.createServer(options, function (req, res) {
                        router(req, res);
                    });
                };
                return HttpServerFactory;
            }()));
            var registerHttpServerFactory = exports('registerHttpServerFactory', function () {
                return container.register('ServerFactory', {
                    useFactory: function () { return new HttpServerFactory(); },
                });
            });

            var HttpsServerFactory = exports('HttpsServerFactory', /** @class */ (function (_super) {
                __extends(HttpsServerFactory, _super);
                function HttpsServerFactory() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                HttpsServerFactory.prototype.create = function (router, options) {
                    if (options === void 0) { options = {}; }
                    return createServer(options, function (req, res) {
                        router(req, res);
                    });
                };
                return HttpsServerFactory;
            }(HttpServerFactory)));
            var registerHttpsServerFactory = exports('registerHttpsServerFactory', function () {
                return container.register('ServerFactory', {
                    useFactory: function () { return new HttpsServerFactory(); },
                });
            });

            var Http2ServerFactory = exports('Http2ServerFactory', /** @class */ (function () {
                function Http2ServerFactory() {
                }
                Http2ServerFactory.prototype.create = function (router, options) {
                    if (options === void 0) { options = {}; }
                    return createServer$1(options, function (req, res) {
                        router(req, res);
                    });
                };
                return Http2ServerFactory;
            }()));
            var registerHttp2ServerFactory = exports('registerHttp2ServerFactory', function () {
                return container.register('ServerFactory', {
                    useFactory: function () { return new Http2ServerFactory(); },
                });
            });

            var Https2ServerFactory = exports('Https2ServerFactory', /** @class */ (function (_super) {
                __extends(Https2ServerFactory, _super);
                function Https2ServerFactory() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Https2ServerFactory.prototype.create = function (router, options) {
                    if (options === void 0) { options = {}; }
                    return createSecureServer(options, function (req, res) {
                        router(req, res);
                    });
                };
                return Https2ServerFactory;
            }(Http2ServerFactory)));
            var registerHttps2ServerFactory = exports('registerHttps2ServerFactory', function () {
                return container.register('ServerFactory', {
                    useFactory: function () { return new Https2ServerFactory(); },
                });
            });

        }
    };
});
