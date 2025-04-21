import { Controller } from '@/interfaces/controller'

import { CreateUserProfileUseCase } from '@/aplication/usecases/user-profile'
import {
  CreateUserProfileInputDTO,
  CreateUserProfileOutputDTO,
} from '@/aplication/interfaces/dtos/user-profile'
import { UUIDGenerator } from '@/infra/services/uuid-generator'
import { CreateUserProfileController } from '@/infra/controller/user-profile'
import { UserProfileSupabaseRepository } from '@/infra/repository/supabase'
import { supabase } from '@/infra/database/supabase'

export const makeCreateUserProfileController = (): Controller<
  CreateUserProfileInputDTO,
  CreateUserProfileOutputDTO
> => {
  const userProfileRepository = new UserProfileSupabaseRepository(supabase)
  const idGenerator = new UUIDGenerator()
  const createUserProfileUseCase = new CreateUserProfileUseCase(userProfileRepository, idGenerator)
  return new CreateUserProfileController(createUserProfileUseCase)
}
