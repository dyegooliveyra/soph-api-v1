import { makeCreateUserProfileController } from '@/infra/factories/user-profile-controller'
import { Router } from '@/interfaces/http'

export const setupUserProfileRoutes = (router: Router): void => {
  const basePath = '/user-profile'

  router.post(basePath, async (req, res) => {
    const controller = makeCreateUserProfileController()

    try {
      const response = await controller.handle(req.body)
      res.status(response.statusCode).json(response.data)
    } catch (error) {
      console.error('Error creating profile:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })
}
