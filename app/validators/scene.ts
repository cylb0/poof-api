import PrivateAsset from '#models/private_asset'
import PublicAsset from '#models/public_asset'
import vine from '@vinejs/vine'
import { imageOrVideoRule } from '../rules/is_image_or_video.js'

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
      .exists(async (db, value) => {
        const publicAsset = (await db
          .from('public_assets')
          .where('id', value)
          .first()) as PublicAsset
        return !!publicAsset
      })
      .use(imageOrVideoRule({ table: 'public_assets', column: 'id' }))
      .optional(),
    privateAssetId: vine
      .number()
      .exists(async (db, value) => {
        const privateAsset = (await db
          .from('private_assets')
          .where('id', value)
          .first()) as PrivateAsset
        return !!privateAsset
      })
      .use(imageOrVideoRule({ table: 'private_assets', column: 'id' }))
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
      .exists(async (db, value) => {
        const publicAsset = (await db
          .from('public_assets')
          .where('id', value)
          .first()) as PublicAsset
        return !!publicAsset
      })
      .use(imageOrVideoRule({ table: 'public_assets', column: 'id' }))
      .optional(),
    privateAssetId: vine
      .number()
      .exists(async (db, value) => {
        const privateAsset = (await db
          .from('private_assets')
          .where('id', value)
          .first()) as PrivateAsset
        return !!privateAsset
      })
      .use(imageOrVideoRule({ table: 'private_assets', column: 'id' }))
      .optional(),
  })
)
