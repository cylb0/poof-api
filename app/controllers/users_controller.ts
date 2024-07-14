import User from '#models/user'
import UserService from '#services/user_service'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserCreationPayload, UserUpdatePayload } from '../types/user.js'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = this.userService.all()
    return response.ok(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload: UserCreationPayload = await request.validateUsing(createUserValidator)
    const user: User = await this.userService.create(payload)
    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = this.userService.findOne(params.id)
    return response.ok(user)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await this.userService.findOne(params.id)
    const payload: UserUpdatePayload = await request.validateUsing(updateUserValidator)
    await this.userService.update(user!, payload)
    return response.ok(user)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await this.userService.findOne(params.id)
    await this.userService.delete(user)
    return response.ok(user)
  }
}
