import { UserProfileNotFoundError } from '@/aplication/errors/profile'
import { GetUserProfileOutputDTO } from '@/aplication/interfaces/dtos'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'

export class GeTUserProfileByEmailUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}
  async execute(email: string): Promise<GetUserProfileOutputDTO> {
    const profile = await this.userProfileRepository.findByEmail(email)

    if (!profile) {
      throw new UserProfileNotFoundError()
    }

    const userProfile: GetUserProfileOutputDTO = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      whatsapp: profile.whatsapp,
      isVerified: profile.isVerified,
    }

    return userProfile
  }
}
