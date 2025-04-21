import dotenv from 'dotenv'
import { ExpressAdapter } from '@/infra/http/express/express-adapter'
import { ExpressRouterAdapter } from '@/infra/http/express/express-router-adapter'
import { Server } from '@/infra/http/server'

dotenv.config()

const startServer = async (): Promise<void> => {
  const port = Number(process.env.PORT) || 3333

  const httpServer = new ExpressAdapter()
  const router = new ExpressRouterAdapter()

  const server = new Server(httpServer, router)

  if (httpServer instanceof ExpressAdapter) {
    await server.setupSwagger(httpServer.getInstance())
  }

  await server.start(port)
}

startServer().catch(console.error)
