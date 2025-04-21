export interface CreateUserProfileInputDTO {
  name: string
  email: string
  whatsapp: string
  authUserId: string
}

export interface CreateUserProfileOutputDTO {
  id: string
  name: string
  email: string
  whatsapp: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface GetUserProfileOutputDTO {
  id: string
  name: string
  email: string
  whatsapp: string
  isVerified: boolean
}
