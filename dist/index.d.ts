/// <reference types="chai" />
/// <reference types="mocha" />
/// <reference types="node" />

import { RouteDescriptor, RouteRegistry, Router, RouterCallable } from '@glasswing/router';
import { Server, ServerOptions } from 'http';
import { Http2SecureServer, Http2Server, SecureServerOptions, ServerOptions } from 'http2';
import { Server, ServerOptions } from 'https';
import { DependencyContainer } from 'tsyringe';

export declare type HttpOrHttpsServerOptions = http.ServerOptions | https.ServerOptions | http2.ServerOptions | http2.SecureServerOptions;
export declare type HttpOrHttpsServer = http.Server | https.Server | http2.Http2Server | http2.Http2SecureServer;
export interface HttpServerListenError extends Error {
	code: string;
}
/**
 * @see https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/
 * @see https://nodejs.org/api/http.html#http_event_request
 * @see https://nodejs.org/api/https.html#https_server_listen
 * @see https://nodejs.org/api/http2.html
 * @see https://nodejs.org/api/net.html
 */
export interface ServerFactory {
	create(router: RouterCallable, options?: HttpOrHttpsServerOptions): HttpOrHttpsServer;
}
export declare class HttpServerFactory {
	create(router: RouterCallable, options?: http.ServerOptions): HttpOrHttpsServer;
}
export declare const registerHttpServerFactory: () => import("tsyringe").DependencyContainer;
export declare class HttpsServerFactory extends HttpServerFactory {
	create(router: RouterCallable, options?: https.ServerOptions): HttpOrHttpsServer;
}
export declare const registerHttpsServerFactory: () => import("tsyringe").DependencyContainer;
export declare class Http2ServerFactory implements ServerFactory {
	create(router: RouterCallable, options?: http2.ServerOptions): HttpOrHttpsServer;
}
export declare const registerHttp2ServerFactory: () => import("tsyringe").DependencyContainer;
export declare class Https2ServerFactory extends Http2ServerFactory {
	create(router: RouterCallable, options?: http2.SecureServerOptions): HttpOrHttpsServer;
}
export declare const registerHttps2ServerFactory: () => import("tsyringe").DependencyContainer;
export declare class Application {
	protected serverFactory: ServerFactory;
	protected router: Router;
	protected routeRegistry: RouteRegistry;
	protected port: number;
	protected host?: string;
	protected retries: number;
	protected retriesMax: number;
	protected server?: HttpOrHttpsServer;
	constructor(serverFactory: ServerFactory, router: Router, routeRegistry: RouteRegistry);
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
	registeredRoutes(): RouteDescriptor[];
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

export {};
