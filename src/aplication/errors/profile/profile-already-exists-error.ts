export class UserProfileAlreadyExistsError extends Error {
  constructor() {
    super('Profile already exists')
    this.name = 'UserProfileAlreadyExistsError'
  }
}
