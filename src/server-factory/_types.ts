import * as http from 'http'
import * as http2 from 'http2'
import * as https from 'https'

export type HttpOrHttpsServerOptions =
  | http.ServerOptions
  | https.ServerOptions
  | http2.ServerOptions
  | http2.SecureServerOptions

export type HttpOrHttpsServer = http.Server | https.Server | http2.Http2Server | http2.Http2SecureServer

export interface HttpServerListenError extends Error {
  code: string
}
