// HTTP Method Types
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

// Generic HTTP Handler Type
export type RequestHandler = (req: HttpRequest, res: ResponseHandler) => Promise<void>
export interface ResponseHandler {
  status(code: number): ResponseHandler
  json(data: any): void
}

// Error Response Interface
export interface ErrorResponse {
  message: string
}

// HTTP Response Interface
export interface HttpResponse<T = unknown> {
  statusCode: number
  data: T | ErrorResponse
}

// HTTP Request Interface
export interface HttpRequest {
  body?: any
  params?: any
  query?: any
  headers?: any
}

// Router Interface
export interface Router {
  get(path: string, handler: RequestHandler): void
  post(path: string, handler: RequestHandler): void
  put(path: string, handler: RequestHandler): void
  delete(path: string, handler: RequestHandler): void
  patch(path: string, handler: RequestHandler): void
}

// HTTP Server Interface
export interface HttpServer {
  on(method: HttpMethod, url: string, callback: RequestHandler): void
  listen(port: number): void
  useRouter(router: any): void
}

// Response Helper Functions
export const ok = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
})

export const serverError = (error: Error): HttpResponse<never> => ({
  statusCode: 500,
  data: { message: error.message },
})
