import { UserProfileNotFoundError } from '@/aplication/errors/profile'
import { GetUserProfileOutputDTO } from '@/aplication/interfaces/dtos'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'

export class GeTUserProfileByEmailUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}
  async execute(email: string): Promise<GetUserProfileOutputDTO> {
    const userProfile = await this.userProfileRepository.findByEmail(email)

    if (!userProfile) {
      throw new UserProfileNotFoundError()
    }

    return userProfile.toJSON()
  }
}
