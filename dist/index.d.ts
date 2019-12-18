/// <reference types="node" />
import { HttpRouteHandler, HttpRouter, RouteRegistry, HttpRouteDescriptor } from '@glasswing/router';
import { DependencyContainer } from 'tsyringe';
import http, { ServerOptions, Server } from 'http';
import http2, { ServerOptions as ServerOptions$2, SecureServerOptions, Http2Server, Http2SecureServer } from 'http2';
import https, { ServerOptions as ServerOptions$1, Server as Server$1 } from 'https';

declare type HttpOrHttpsServerOptions = ServerOptions | ServerOptions$1 | ServerOptions$2 | SecureServerOptions;
declare type HttpOrHttpsServer = Server | Server$1 | Http2Server | Http2SecureServer;
interface HttpServerListenError extends Error {
    code: string;
}

/**
 * @see https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/
 * @see https://nodejs.org/api/http.html#http_event_request
 * @see https://nodejs.org/api/https.html#https_server_listen
 * @see https://nodejs.org/api/http2.html
 * @see https://nodejs.org/api/net.html
 */
interface ServerFactory {
    create(router: HttpRouteHandler, options?: HttpOrHttpsServerOptions, useHttps?: boolean): HttpOrHttpsServer;
}
declare class HttpServerFactory implements ServerFactory {
    create(router: HttpRouteHandler, options?: http.ServerOptions | https.ServerOptions, useHttps?: boolean): HttpOrHttpsServer;
}
declare const registerHttpServerFactory: (c?: DependencyContainer | undefined) => void;

declare class Http2ServerFactory implements ServerFactory {
    create(router: HttpRouteHandler, options?: http2.ServerOptions | http2.SecureServerOptions, useHttps?: boolean): HttpOrHttpsServer;
}
declare const registerHttp2ServerFactory: (c?: DependencyContainer | undefined) => void;

declare class Application {
    protected serverFactory: ServerFactory;
    protected router: HttpRouter;
    protected port: number;
    protected host?: string;
    protected retries: number;
    protected retriesMax: number;
    protected server?: HttpOrHttpsServer;
    protected routeRegistry: RouteRegistry;
    constructor(serverFactory: ServerFactory, router: HttpRouter);
    /**
     * Register a controller to the application
     * @param controller
     */
    registerController(controller: any): void;
    /**
     * Register a set of controllers to the application
     * @param controllers
     */
    registerControllers(controllers: any[]): void;
    /**
     * Obtain the list of application registered routes
     */
    registeredRoutes(): HttpRouteDescriptor[];
    /**
     *
     * @param {number} port
     * @param {string} host
     * @returns {Promise<void>}
     */
    start(port?: number, host?: string): Promise<void>;
    /**
     *
     * @returns {Promise<void>}
     */
    stop(): Promise<void>;
    /**
     *
     * @returns {Promise<void>}
     */
    protected tryStart(): Promise<void>;
}
declare const registerApplication: (c?: DependencyContainer | undefined) => void;

export { Application, Http2ServerFactory, HttpOrHttpsServer, HttpOrHttpsServerOptions, HttpServerFactory, HttpServerListenError, ServerFactory, registerApplication, registerHttp2ServerFactory, registerHttpServerFactory };
