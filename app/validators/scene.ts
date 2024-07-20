import { Assets } from '#enums/assets'
import PrivateAsset from '#models/private_asset'
import PublicAsset from '#models/public_asset'
import vine from '@vinejs/vine'

/**
 * Validator for scene creation payload
 */
export const createSceneValidator = vine.compile(
  vine.object({
    duration: vine.number(),
    storyId: vine.number(),
    backgroundColor: vine.string().hexCode().optional(),
    publicAssetId: vine
      .number()
      .exists(async (query, field) => {
        const publicAsset = (await query
          .from('public_assets')
          .where('id', field)
          .first()) as PublicAsset
        return (
          !!publicAsset && (publicAsset.type === Assets.IMAGE || publicAsset.type === Assets.VIDEO)
        )
      })
      .optional(),
    privateAssetId: vine
      .number()
      .exists(async (query, field) => {
        const privateAsset = (await query
          .from('private_assets')
          .where('id', field)
          .first()) as PrivateAsset
        return (
          !!privateAsset &&
          (privateAsset.type === Assets.IMAGE || privateAsset.type === Assets.VIDEO)
        )
      })
      .optional(),
  })
)

/**
 * Validator for scene update payload
 */
export const updateSceneValidator = vine.compile(
  vine.object({
    duration: vine.number().optional(),
    backgroundColor: vine.string().optional(),
    publicAssetId: vine
      .number()
      .exists(async (query, field) => {
        const publicAsset = await query.from('public_assets').where('id', field).first()
        return !!publicAsset
      })
      .optional(),
    privateAssetId: vine
      .number()
      .exists(async (query, field) => {
        const privateAsset = await query.from('private_assets').where('id', field).first()
        return !!privateAsset
      })
      .optional(),
  })
)
