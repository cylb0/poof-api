import User from '#models/user'
import UserService from '#services/user_service'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserCreationPayload, UserUpdatePayload } from '../types/user.js'
import UserPolicy from '#policies/user_policy'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('show')) {
      return response.forbidden({
        message: `You cannot access this resource.`,
      })
    }
    const users = await this.userService.all()
    return response.ok(users)
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('show')) {
      return response.forbidden({
        message: `You cannot access this resource.`,
      })
    }
    const user = this.userService.findOne(params.id)
    return response.ok(user)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('create')) {
      return response.forbidden({
        message: `You cannot access this resource.`,
      })
    }
    const payload: UserCreationPayload = await request.validateUsing(createUserValidator)
    const user: User = await this.userService.create(payload)
    return response.created(user)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const user = await this.userService.findOne(params.id)
    if (await bouncer.with(UserPolicy).denies('edit', user)) {
      return response.forbidden({
        message: `You cannot access this resource.`,
      })
    }
    const payload: UserUpdatePayload = await request.validateUsing(updateUserValidator)
    await this.userService.update(user!, payload)
    return response.ok(user)
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const user = await this.userService.findOne(params.id)
    if (await bouncer.with(UserPolicy).denies('delete', user)) {
      return response.forbidden({
        message: `You cannot access this resource.`,
      })
    }
    await this.userService.delete(user)
    return response.ok(user)
  }
}
