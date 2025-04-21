import { UserProfile } from '@/domain/entities'

export interface UserProfileRepository {
  create(input: UserProfile): Promise<void>
  findById(id: string): Promise<UserProfile>
  findByEmail(email: string): Promise<UserProfile>
  update(input: any): Promise<void>
  delete(id: string): Promise<void>
  findAll(): Promise<UserProfile[]>
}
