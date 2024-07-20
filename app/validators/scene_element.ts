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
      .exists(async (query, field) => {
        const scene = await query.from('scenes').where('id', field).first()
        return !!scene
      }),
    type: vine.enum(SceneElementType),
    zIndex: vine.number().positive().optional(),
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
