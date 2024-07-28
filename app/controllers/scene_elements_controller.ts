import {
  FORBIDDEN_MESSAGE,
  RESOURCE_CREATION_SUCCESS,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_FOUND,
  RESOURCE_LIST_FOUND,
  RESOURCE_UPDATE_SUCCESS,
} from '#constants/api_response_messages'
import SceneElementPolicy from '#policies/scene_element_policy'
import SceneElementService from '#services/scene_element_service'
import { SceneElementCreationPayload, SceneElementUpdatePayload } from '#types/scene_element'
import { createSceneElementValidator, updateSceneElementValidator } from '#validators/scene_element'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SceneElementsController {
  constructor(protected sceneElementService: SceneElementService) {}

  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(SceneElementPolicy).denies('index')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const sceneElements = await this.sceneElementService.index()
    return response.ok({
      message: RESOURCE_LIST_FOUND,
      data: sceneElements,
    })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    const sceneElement = await this.sceneElementService.show(params.id)
    if (await bouncer.with(SceneElementPolicy).denies('show', sceneElement)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    return response.ok({
      message: RESOURCE_FOUND,
      data: sceneElement,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(SceneElementPolicy).denies('store')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: SceneElementCreationPayload = await request.validateUsing(
      createSceneElementValidator
    )

    const contentCount = this.sceneElementService.payloadHasContent(payload)

    if (contentCount === 0) {
      return response.badRequest({ message: 'A content is required.' })
    }

    if (contentCount > 1) {
      return response.badRequest({ message: 'Only one asset can be provided.' })
    }

    const sceneElement = await this.sceneElementService.store(payload)
    return response.created({
      message: RESOURCE_CREATION_SUCCESS,
      data: sceneElement,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const sceneElement = await this.sceneElementService.show(params.id)
    if (await bouncer.with(SceneElementPolicy).denies('update', sceneElement)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: SceneElementUpdatePayload = await request.validateUsing(
      updateSceneElementValidator
    )

    const contentCount = this.sceneElementService.payloadHasContent(payload)

    if (contentCount > 1) {
      return response.badRequest({ message: 'Only one asset can be provided.' })
    }

    const updatedSceneElement = await this.sceneElementService.update(sceneElement, payload)
    return response.ok({
      message: RESOURCE_UPDATE_SUCCESS,
      data: updatedSceneElement,
    })
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const sceneElement = await this.sceneElementService.show(params.id)
    if (await bouncer.with(SceneElementPolicy).denies('destroy', sceneElement)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    await this.sceneElementService.destroy(sceneElement)
    return response.ok({
      message: RESOURCE_DELETE_SUCCESS,
      data: sceneElement,
    })
  }
}
