import { ProfileNotVerifiedError } from '@/aplication/errors/profile'
import { UserProfileNotFoundError } from '@/aplication/errors/profile'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'

export class UserIsVerifiedUseCase {
  constructor(private UserProfileRepository: UserProfileRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.UserProfileRepository.findById(id)

    if (!user) {
      throw new UserProfileNotFoundError()
    }

    if (!user.isVerified) {
      throw new ProfileNotVerifiedError()
    }
  }
}
