import { CreateUserProfileInputDTO, CreateUserProfileOutputDTO } from '@/aplication/interfaces/dtos'
import { UserProfile } from '@/domain/entities'
import { UserProfileRepository } from '@/interfaces/repositories/user-profile-repository'
import { IdGenerator } from '@/interfaces/services/id-generator'

export class CreateUserProfileUseCase {
  constructor(
    private userProfileRepository: UserProfileRepository,
    private idGenerator: IdGenerator,
  ) {}
  async execute(input: CreateUserProfileInputDTO): Promise<CreateUserProfileOutputDTO> {
    const existingUser = await this.userProfileRepository.findByEmail(input.email)

    if (existingUser) {
      throw new Error('User already exists')
    }

    const id = this.idGenerator.generate()

    const userProfile = new UserProfile({
      id,
      name: input.name,
      email: input.email,
      whatsapp: input.whatsapp,
      isVerified: false,
      authUserId: input.authUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await this.userProfileRepository.create(userProfile)

    return userProfile.toJSON()
  }
}
