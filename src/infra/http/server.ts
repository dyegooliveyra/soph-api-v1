import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '@/infra/http/swagger/swaggerConfig'
import { HttpServer, Router } from '@/interfaces/http'
import { setupRoutes } from '@/infra/routes/index.ts'
import { ExpressRouterAdapter } from '@/infra/http/express/express-router-adapter'

export class Server {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly router: Router,
  ) {}

  async setupSwagger(expressInstance: any): Promise<void> {
    expressInstance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  async start(port: number): Promise<void> {
    setupRoutes(this.router)

    if (this.router instanceof ExpressRouterAdapter) {
      this.httpServer.useRouter(this.router.getRouter())
    }

    this.httpServer.listen(port)
  }
}
