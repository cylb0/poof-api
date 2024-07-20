import SceneElementService from '#services/scene_element_service'
import { SceneElementCreationPayload } from '#types/scene_element'
import { createSceneElementValidator } from '#validators/scene_element'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SceneElementsController {
  constructor(protected sceneElementService: SceneElementService) {}

  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const sceneElements = await this.sceneElementService.all()
    return response.ok(sceneElements)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const sceneElement = await this.sceneElementService.findOne(params.id)
    return response.ok(sceneElement)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
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

    const sceneElement = await this.sceneElementService.create(payload)
    return response.created(sceneElement)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
