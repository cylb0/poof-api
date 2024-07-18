import { FORBIDDEN_MESSAGE } from '#constants/exception_messages'
import ScenePolicy from '#policies/scene_policy'
import SceneService from '#services/scene_service'
import { SceneCreationPayload, SceneUpdatePayload } from '#types/scene'
import { createSceneValidator, updateSceneValidator } from '#validators/scene'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ScenesController {
  constructor(protected sceneService: SceneService) {}
  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(ScenePolicy).denies('index')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const scenes = await this.sceneService.all()
    return response.ok(scenes)
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    const scene = await this.sceneService.findOne(params.id)
    if (await bouncer.with(ScenePolicy).denies('show', scene)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    return response.ok(scene)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(ScenePolicy).denies('create')) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const payload: SceneCreationPayload = await request.validateUsing(createSceneValidator)
    if (!payload.privateAssetId && !payload.publicAssetId && !payload.backgroundColor) {
      return response.badRequest({ message: `A scene must have a content.` })
    }
    if (payload.privateAssetId && payload.publicAssetId) {
      return response.badRequest({ message: `You can only select one asset.` })
    }
    const scene = await this.sceneService.create(payload)
    return response.created(scene)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const scene = await this.sceneService.findOne(params.id)
    if (await bouncer.with(ScenePolicy).denies('update', scene)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    const payload: SceneUpdatePayload = await request.validateUsing(updateSceneValidator)

    const existingHasPublicAsset = !!scene.publicAssetId
    const existingHasPrivateAsset = !!scene.privateAssetId
    const existingHasBackground = !!scene.backgroundColor
    const hasPublicAsset = existingHasPublicAsset || payload.publicAssetId
    const hasPrivateAsset = existingHasPrivateAsset || payload.privateAssetId
    const hasBackground = existingHasBackground || payload.backgroundColor

    if (hasPublicAsset && hasPrivateAsset) {
      return response.badRequest({ message: `You can only select one asset.` })
    }

    if (!hasPrivateAsset && !hasPublicAsset && !hasBackground) {
      return response.badRequest({ message: `You can only select one asset.` })
    }

    const updatedScene = await this.sceneService.update(scene, payload)
    return response.ok(updatedScene)
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const scene = await this.sceneService.findOne(params.id)
    if (await bouncer.with(ScenePolicy).denies('destroy', scene)) {
      return response.forbidden({ message: FORBIDDEN_MESSAGE })
    }
    await this.sceneService.delete(scene)
    return response.ok(scene)
  }
}
