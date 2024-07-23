import { Assets } from '#enums/assets'
import vine from '@vinejs/vine'

/**
 * Validator for private asset creation action
 */
export const createPrivateAssetValidator = vine.compile(
  vine.object({
    type: vine.enum(Assets),
    filename: vine.string(),
    userId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const user = await db.from('users').where('id', value).first()
        return !!user
      }),
  })
)

/**
 * Validator for private asset update action
 */
export const updatePrivateAssetValidator = vine.compile(
  vine.object({
    filename: vine.string(),
  })
)
