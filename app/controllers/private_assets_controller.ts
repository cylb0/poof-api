import { FORBIDDEN_MESSAGE } from '#constants/exception_messages'
import PrivateAsset from '#models/private_asset'
import PrivateAssetPolicy from '#policies/private_asset_policy'
import PrivateAssetService from '#services/private_asset_service'
import { PrivateAssetCreationPayload, PrivateAssetUpdatePayload } from '#types/private_asset'
import { createPrivateAssetValidator, updatePrivateAssetValidator } from '#validators/private_asset'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PrivateAssetsController {
  constructor(protected privateAssetService: PrivateAssetService) {}

  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(PrivateAssetPolicy).denies('index')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const privateAssets = await this.privateAssetService.all()
    return response.ok(privateAssets)
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    const privateAsset = await this.privateAssetService.findOne(params.id)
    if (await bouncer.with(PrivateAssetPolicy).denies('show', privateAsset)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    return response.ok(privateAsset)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(PrivateAssetPolicy).denies('store')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: PrivateAssetCreationPayload = await request.validateUsing(
      createPrivateAssetValidator
    )
    const privateAsset: PrivateAsset = await this.privateAssetService.create(payload)
    return response.created(privateAsset)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const privateAsset = await this.privateAssetService.findOne(params.id)
    if (await bouncer.with(PrivateAssetPolicy).denies('update', privateAsset)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: PrivateAssetUpdatePayload = await request.validateUsing(
      updatePrivateAssetValidator
    )
    const updatedPrivateAsset: PrivateAsset = await this.privateAssetService.update(
      privateAsset,
      payload
    )
    return response.ok(updatedPrivateAsset)
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const privateAsset = await this.privateAssetService.findOne(params.id)
    if (await bouncer.with(PrivateAssetPolicy).denies('destroy', privateAsset)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    await this.privateAssetService.delete(privateAsset)
    return response.ok(privateAsset)
  }
}
