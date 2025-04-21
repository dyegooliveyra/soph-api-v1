import { Router, RequestHandler } from '@/interfaces/http';
import { Router as ExpressRouter, Request, Response } from 'express';

export class ExpressRouterAdapter implements Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
    console.log('Routes');
  }

  private adaptHandler(handler: RequestHandler) {
    return async (req: Request, res: Response) => {
      try {
        const httpRequest = {
          body: req.body,
          params: req.params,
          query: req.query,
          headers: req.headers
        };
        
        await handler(httpRequest, {
          status: (code: number) => {
            res.status(code);
            return res;
          },
          json: (data: any) => res.json(data)
        });
      } catch (error) {
        console.error('Unhandled error in route handler:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };
  }

  get(path: string, handler: RequestHandler): void {
    console.log(`GET - ${path}`);
    this.router.get(path, this.adaptHandler(handler));
  }

  post(path: string, handler: RequestHandler): void {
    console.log(`POST - ${path}`);
    this.router.post(path, this.adaptHandler(handler));
  }

  put(path: string, handler: RequestHandler): void {
    console.log(`PUT - ${path}`);
    this.router.put(path, this.adaptHandler(handler));
  }

  delete(path: string, handler: RequestHandler): void {
    console.log(`DELETE - ${path}`);
    this.router.delete(path, this.adaptHandler(handler));
  }

  patch(path: string, handler: RequestHandler): void {
    console.log(`PATCH - ${path}`);
    this.router.patch(path, this.adaptHandler(handler));
  }

  getRouter(): ExpressRouter {
    return this.router;
  }
}