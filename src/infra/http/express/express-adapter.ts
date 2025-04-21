import { HttpMethod, HttpRequest, HttpResponse, HttpServer } from '@/interfaces/http'
import express, { Express, Request, Response, Router } from 'express'
import cors from 'cors'

export class ExpressAdapter implements HttpServer {
  private app: Express

  constructor() {
    this.app = express()
    this.setupMiddlewares()
  }

  private setupMiddlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  on(method: HttpMethod, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      }

      const httpResponse: HttpResponse = await callback(httpRequest)

      res.status(httpResponse.statusCode).json(httpResponse.data)
    })
  }

  useRouter(router: Router): void {
    this.app.use(router)
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`)
    })
  }

  getInstance(): Express {
    return this.app
  }
}
