import { SceneElementType } from '#enums/assets'
import vine from '@vinejs/vine'

/**
 * Validator for scene element creation action
 */
export const createSceneElementValidator = vine.compile(
  vine.object({
    sceneId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const scene = await db.from('scenes').where('id', value).first()
        return !!scene
      }),
    type: vine.enum(SceneElementType),
    zIndex: vine.number().positive().optional(),
    publicAssetId: vine
      .number()
      .exists(async (db, value) => {
        const publicAsset = await db.from('public_assets').where('id', value).first()
        return !!publicAsset
      })
      .optional(),
    privateAssetId: vine
      .number()
      .exists(async (db, value) => {
        const privateAsset = await db.from('private_assets').where('id', value).first()
        return !!privateAsset
      })
      .optional(),
    textContent: vine.string().optional(),
    from: vine.number().positive(),
    duration: vine.number().positive(),
    position: vine
      .object({
        x: vine.number(),
        y: vine.number(),
      })
      .optional(),
    dimensions: vine
      .object({
        height: vine.number().positive(),
        width: vine.number().positive(),
      })
      .optional(),
    metadata: vine.any().optional(), // TO DO !
  })
)

/**
 * Validator for scene element update payload
 */
export const updateSceneElementValidator = vine.compile(
  vine.object({
    type: vine.enum(SceneElementType),
    zIndex: vine.number().positive().optional(),
    publicAssetId: vine
      .number()
      .exists(async (db, value) => {
        const publicAsset = await db.from('public_assets').where('id', value).first()
        return !!publicAsset
      })
      .optional(),
    privateAssetId: vine
      .number()
      .exists(async (db, value) => {
        const privateAsset = await db.from('private_assets').where('id', value).first()
        return !!privateAsset
      })
      .optional(),
    textContent: vine.string().optional(),
    from: vine.number().positive().optional(),
    duration: vine.number().positive().optional(),
    position: vine
      .object({
        x: vine.number(),
        y: vine.number(),
      })
      .optional(),
    dimensions: vine
      .object({
        height: vine.number().positive(),
        width: vine.number().positive(),
      })
      .optional(),
    metadata: vine.any().optional(), // TO DO !
  })
)
