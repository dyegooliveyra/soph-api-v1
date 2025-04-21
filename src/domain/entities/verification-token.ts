export class VerificationToken {
  private _userId: string
  private _token: string
  private _expiresAt: Date
  private _createdAt: Date
  private _isUsed: boolean

  constructor(props: {
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    isUsed: boolean
  }) {
    this._userId = props.userId
    this._token = props.token
    this._expiresAt = props.expiresAt
    this._createdAt = props.createdAt
    this._isUsed = props.isUsed

    this.validate()
  }

  private validate() {
    if (!this._userId) {
      throw new Error('UserId is required')
    }
    if (!this._token) {
      throw new Error('Token is required')
    }
    if (!this._createdAt) {
      throw new Error('CreatedAt is required')
    }
    if (!this._expiresAt || this._expiresAt < new Date()) {
      throw new Error('ExpiresAt is required and must be in the future')
    }
  }

  getUserId(): string {
    return this._userId
  }
  getToken(): string {
    return this._token
  }
  getExpiresAt(): Date {
    return this._expiresAt
  }

  getIsUsed(): boolean {
    return this._isUsed
  }

  markAsUsed(): void {
    this._isUsed = true
  }
}
