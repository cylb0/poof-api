import vine from '@vinejs/vine'

/**
 * Validator for scene creation payload
 */
export const createSceneValidator = vine.compile(
  vine.object({
    duration: vine.number(),
    storyId: vine.number(),
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
