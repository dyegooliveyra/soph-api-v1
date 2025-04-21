import { UserProfile } from '@/domain/entities'
import { ProfileNotVerifiedError } from '@/aplication/errors/profile'

export const verifyProfileIsVerified = (profile: UserProfile) => {
  if (!profile.isVerified) {
    throw new ProfileNotVerifiedError()
  }
}
