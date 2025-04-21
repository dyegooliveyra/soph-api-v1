export class UserProfile {
  private readonly _id: string
  private readonly _name: string
  private readonly _email: string
  private readonly _whatsapp: string
  private readonly _isVerified: boolean
  private readonly _authUserId?: string
  private readonly _createdAt: Date
  private readonly _updatedAt: Date

  constructor(props: {
    id: string
    name: string
    email: string
    whatsapp: string
    isVerified: boolean
    authUserId?: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    this._id = props.id
    this._name = props.name
    this._whatsapp = props.whatsapp
    this._email = props.email
    this._isVerified = props.isVerified
    this._authUserId = props.authUserId
    this._createdAt = props.createdAt || new Date()
    this._updatedAt = props.updatedAt || new Date()

    this.validate()
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('Id is required')
    }
    if (!this._name) {
      throw new Error('Name is required')
    }
    if (!this._whatsapp) {
      throw new Error('Whatsapp is required')
    }
    if (!this._email) {
      throw new Error('Email is required')
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get whatsapp(): string {
    return this._whatsapp
  }

  get email(): string {
    return this._email
  }

  get isVerified(): boolean {
    return this._isVerified
  }

  get authUserId(): string | undefined {
    return this._authUserId
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  update(props: {
    name?: string
    whatsapp?: string
    email?: string
    isVerified?: boolean
    authUserId?: string
  }): UserProfile {
    return new UserProfile({
      id: this._id,
      name: props.name || this._name,
      email: props.email || this._email,
      whatsapp: props.whatsapp || this._whatsapp,
      isVerified: props.isVerified || this._isVerified,
      authUserId: props.authUserId || this._authUserId,
      createdAt: this._createdAt,
      updatedAt: new Date(),
    })
  }

  toJSON(): {
    id: string
    name: string
    email: string
    whatsapp: string
    isVerified: boolean
    authUserId?: string
    createdAt: string
    updatedAt: string
  } {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      whatsapp: this._whatsapp,
      isVerified: this._isVerified,
      authUserId: this._authUserId,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    }
  }
}
