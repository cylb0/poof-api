import User from '#models/user'
import UserService from '#services/user_service'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserCreationPayload, UserUpdatePayload } from '../types/user.js'
import UserPolicy from '#policies/user_policy'
import {
  FORBIDDEN_MESSAGE,
  RESOURCE_CREATION_SUCCESS,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_FOUND,
  RESOURCE_LIST_FOUND,
  RESOURCE_UPDATE_SUCCESS,
} from '#constants/api_response_messages'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('index')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const users = await this.userService.all()
    return response.ok({
      message: RESOURCE_LIST_FOUND,
      data: users,
    })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    const user = await this.userService.show(params.id)
    if (await bouncer.with(UserPolicy).denies('show', user)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    return response.ok({
      message: RESOURCE_FOUND,
      data: user,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('store')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: UserCreationPayload = await request.validateUsing(createUserValidator)
    const user: User = await this.userService.store(payload)
    return response.created({
      message: RESOURCE_CREATION_SUCCESS,
      data: user,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const user = await this.userService.show(params.id)
    if (await bouncer.with(UserPolicy).denies('update', user)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: UserUpdatePayload = await request.validateUsing(updateUserValidator, {
      meta: {
        userId: user.id,
      },
    })
    await this.userService.update(user!, payload)
    return response.ok({
      message: RESOURCE_UPDATE_SUCCESS,
      data: user,
    })
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const user = await this.userService.show(params.id)
    if (await bouncer.with(UserPolicy).denies('delete', user)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    await this.userService.destroy(user)
    return response.ok({
      message: RESOURCE_DELETE_SUCCESS,
      data: user,
    })
  }
}
