import { UserProfile } from '@/domain/entities'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'
import { SupabaseClient } from '@supabase/supabase-js'

export class UserProfileSupabaseRepository implements UserProfileRepository {
  constructor(private supabase: SupabaseClient) {}
  async create(input: UserProfile): Promise<void> {
    const { error } = await this.supabase.from('user_profiles').insert({
      id: input.id,
      name: input.name,
      email: input.email,
      whatsapp: input.whatsapp,
      is_verified: input.isVerified,
      auth_user_id: input.authUserId,
      created_at: input.createdAt.toISOString(),
      updated_at: input.updatedAt.toISOString(),
    })

    if (error) {
      throw new Error(`Failed to create user profile: ${error.message}`)
    }
  }
  async findById(id: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(`Failed to find user profile: ${error.message}`)
    }

    return data
  }
  async findByEmail(email: string): Promise<any> {
    console.log(email)
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle()
    console.log(data, error)
    if (error) {
      throw new Error(`Failed to find user profile: ${error.message}`)
    }

    return data
  }
  async update(input: any): Promise<void> {
    const { error } = await this.supabase
      .from('user_profiles')
      .update({
        name: input.name,
        email: input.email,
        whatsapp: input.whatsapp,
        is_verified: input.isVerified,
        updated_at: input.updatedAt.toISOString(),
      })
      .eq('id', input.id)

    if (error) {
      throw new Error(`Failed to update user profile: ${error.message}`)
    }
  }
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('user_profiles').delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete user profile: ${error.message}`)
    }
  }
  async findAll(): Promise<UserProfile[]> {
    const { data, error } = await this.supabase.from('user_profiles').select('*')

    if (error) {
      throw new Error(`Failed to find all user profiles: ${error.message}`)
    }

    return data
  }
}
