import { IdGenerator } from '@/interfaces/services/id-generator'
import crypto from 'crypto'

export class UUIDGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID()
  }
}
