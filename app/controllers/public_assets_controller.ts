import PublicAssetPolicy from '#policies/public_asset_policy'
import PublicAssetService from '#services/public_asset_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import {
  FORBIDDEN_MESSAGE,
  RESOURCE_CREATION_SUCCESS,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_FOUND,
  RESOURCE_LIST_FOUND,
  RESOURCE_UPDATE_SUCCESS,
} from '../constants/api_response_messages.js'
import { createPublicAssetValidator, updatePublicAssetValidator } from '#validators/public_asset'
import PublicAsset from '#models/public_asset'
import { PublicAssetUpdatePayload } from '#types/public_assets'

@inject()
export default class PublicAssetsController {
  constructor(protected publicAssetService: PublicAssetService) {}

  /**
   * Display a list of resource
   */
  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(PublicAssetPolicy).denies('index')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const publicAssets = await this.publicAssetService.all()
    return response.ok({
      message: RESOURCE_LIST_FOUND,
      data: publicAssets,
    })
  }

  /**
   * Show individual record
   */
  async show({ bouncer, params, response }: HttpContext) {
    const publicAsset = await this.publicAssetService.show(params.id)
    if (await bouncer.with(PublicAssetPolicy).denies('show', publicAsset)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    return response.ok({
      message: RESOURCE_FOUND,
      data: publicAsset,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ bouncer, request, response }: HttpContext) {
    if (await bouncer.with(PublicAssetPolicy).denies('store')) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload = await request.validateUsing(createPublicAssetValidator)
    const publicAsset: PublicAsset = await this.publicAssetService.create(payload)
    return response.created({
      message: RESOURCE_CREATION_SUCCESS,
      data: publicAsset,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ bouncer, params, request, response }: HttpContext) {
    const publicAsset = await this.publicAssetService.show(params.id)
    if (await bouncer.with(PublicAssetPolicy).denies('update', publicAsset)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    const payload: PublicAssetUpdatePayload = await request.validateUsing(
      updatePublicAssetValidator
    )
    const updatedPublicAsset: PublicAsset = await this.publicAssetService.update(
      publicAsset,
      payload
    )
    return response.ok({
      message: RESOURCE_UPDATE_SUCCESS,
      data: updatedPublicAsset,
    })
  }

  /**
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    const publicAsset = await this.publicAssetService.show(params.id)
    if (await bouncer.with(PublicAssetPolicy).denies('destroy', publicAsset)) {
      return response.forbidden({
        message: FORBIDDEN_MESSAGE,
      })
    }
    await this.publicAssetService.delete(publicAsset)
    return response.ok({
      message: RESOURCE_DELETE_SUCCESS,
      data: publicAsset,
    })
  }
}
