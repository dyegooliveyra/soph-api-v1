import { Router } from '@/interfaces/http'
import { setupUserProfileRoutes } from '@/infra/routes/user-profile-routes'

export const setupRoutes = (router: Router): void => {
  setupUserProfileRoutes(router)
}
