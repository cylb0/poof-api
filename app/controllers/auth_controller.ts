import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import { RegisterPayload } from '../types/auth.js'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(protected userService: UserService) {}

  async register({ request, response }: HttpContext) {
    const payload: RegisterPayload = await request.validateUsing(registerValidator)
    const user = await this.userService.create(payload)
    return response.created({
      message: 'User created successfully.',
      email: user.email,
    })
  }
}
