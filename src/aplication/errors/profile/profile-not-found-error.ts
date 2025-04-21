export class UserProfileNotFoundError extends Error {
  constructor() {
    super('User Profile not found')
    this.name = 'UserProfileNotFoundError'
  }
}
