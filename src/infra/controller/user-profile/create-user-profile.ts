import { ProfileAlreadyExistsError } from '@/aplication/errors/profile'
import {
  CreateUserProfileInputDTO,
  CreateUserProfileOutputDTO,
} from '@/aplication/interfaces/dtos/user-profile'
import { CreateUserProfileUseCase } from '@/aplication/usecases/user-profile'
import { Controller } from '@/interfaces/controller'
import { conflictError, HttpResponse, ok, serverError } from '@/interfaces/http'

export class CreateUserProfileController
  implements Controller<CreateUserProfileInputDTO, CreateUserProfileOutputDTO>
{
  constructor(private readonly createUserProfileUseCase: CreateUserProfileUseCase) {}

  async handle(
    input: CreateUserProfileInputDTO,
  ): Promise<HttpResponse<CreateUserProfileOutputDTO>> {
    try {
      const result = await this.createUserProfileUseCase.execute(input)
      return ok(result)
    } catch (error) {
      if (error instanceof ProfileAlreadyExistsError) {
        return conflictError('Já existe um perfil cadastrado com este e-mail')
      }
      return serverError(error instanceof Error ? error : new Error('Unknown error'))
    }
  }
}

/**
 * @swagger
 * /user-profile:
 *   post:
 *     summary: Cria um novo perfil de usuário
 *     tags:
 *       - User Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - whatsapp
 *               - authUserId
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               whatsapp:
 *                 type: string
 *                 example: +5511999999999
 *               authUserId:
 *                type: string
 *                example: 994c8035-d3cb-4672-968f-9a5c98c5c352
 *     responses:
 *       200:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123e4567-e89b-12d3-a456-426614174000
 *                 name:
 *                   type: string
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   example: joao@email.com
 *                 whatsapp:
 *                   type: string
 *                   example: +5511999999999
 *                 isVerified:
 *                   type: boolean
 *                   example: false
 *                 authUserId:
 *                   type: string
 *                   example: 994c8035-d3cb-4672-968f-9a5c98c5c352
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-04-19T12:00:00Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-04-19T12:00:00Z
 *       500:
 *         description: Erro interno do servidor
 */
