export class ProfileNotVerifiedError extends Error {
  constructor() {
    super('Whatsapp Number not verified')
    this.name = 'ProfileNotVerifiedError'
  }
}
