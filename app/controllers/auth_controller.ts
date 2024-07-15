import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/auth'
import { RegisterPayload } from '../types/auth.js'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import AuthService from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    const payload: RegisterPayload = await request.validateUsing(registerValidator)
    const user = await this.authService.register(payload)
    return response.created({
      message: 'User created successfully.',
      email: user.email,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    const serializedUser = this.authService.serializeUser(user)

    return response.ok({
      message: 'Logged in.',
      token: {
        type: 'bearer',
        value: token.value!.release(),
      },
      user: serializedUser,
    })
  }
}
