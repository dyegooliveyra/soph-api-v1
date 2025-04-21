export default interface DatabaseConnection {
  // Métodos principais genéricos

  // Para consultas genéricas - útil para SQL ou queries específicas de NoSQL
  query<T = any>(queryText: string, params?: any): Promise<T[]>

  // Operações básicas que funcionam para qualquer tipo de banco
  findAll<T = any>(entity: string, options?: QueryOptions): Promise<T[]>
  findById<T = any>(entity: string, id: any): Promise<T | null>
  findOne<T = any>(entity: string, filter: any): Promise<T | null>

  // Operações de escrita
  create<T = any>(entity: string, data: any): Promise<T>
  update<T = any>(entity: string, id: any, data: any): Promise<T | null>
  delete(entity: string, id: any): Promise<boolean>

  // Operações em lote para maior performance
  createMany<T = any>(entity: string, items: any[]): Promise<T[]>
  updateMany(entity: string, filter: any, data: any): Promise<number>
  deleteMany(entity: string, filter: any): Promise<number>

  // Controle de transações (opcional - alguns NoSQL não suportam)
  beginTransaction?(): Promise<void>
  commitTransaction?(): Promise<void>
  rollbackTransaction?(): Promise<void>

  // Recursos avançados
  aggregate<T = any>(entity: string, pipeline: any[]): Promise<T[]>
  count(entity: string, filter?: any): Promise<number>

  // Gerenciamento de conexão
  close(): Promise<void>
  ping(): Promise<boolean>
}
export interface QueryOptions {
  filter?: any // Condições WHERE/filtros
  sort?: any // Ordenação
  limit?: number // Limite de resultados
  offset?: number // Saltar N resultados
  fields?: string[] // Campos a selecionar
  relations?: string[] // Relações a incluir (joins ou referencias)
}
