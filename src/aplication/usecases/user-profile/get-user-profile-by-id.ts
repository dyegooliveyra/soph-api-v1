import { UserProfileNotFoundError } from '@/aplication/errors/profile'
import { GetUserProfileOutputDTO } from '@/aplication/interfaces/dtos'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'

export class GeTUserProfileByIdUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}
  async execute(id: string): Promise<GetUserProfileOutputDTO> {
    const userProfile = await this.userProfileRepository.findById(id)

    if (!userProfile) {
      throw new UserProfileNotFoundError()
    }

    const userProfileDTO: GetUserProfileOutputDTO = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      whatsapp: userProfile.whatsapp,
      isVerified: userProfile.isVerified,
    }

    return userProfileDTO
  }
}
