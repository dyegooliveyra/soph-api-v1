import { HttpResponse } from '@/interfaces/http'

export interface Controller<I, O> {
  handle(input: I): Promise<HttpResponse<O>>
}
