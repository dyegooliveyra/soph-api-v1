import { UserProfileNotFoundError } from '@/aplication/errors/profile'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'

export class DeleteUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userProfileRepository.findById(id)

    if (!user) {
      throw new UserProfileNotFoundError()
    }

    await this.userProfileRepository.delete(id)
  }
}
