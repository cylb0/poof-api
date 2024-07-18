import { Assets } from '#enums/assets'
import vine from '@vinejs/vine'

/**
 * Validator for public asset creation action
 */
export const createPublicAssetValidator = vine.compile(
  vine.object({
    type: vine.enum(Assets),
    filename: vine.string(),
  })
)

/**
 * Validator for public asset update action
 */
export const updatePublicAssetValidator = vine.compile(
  vine.object({
    filename: vine.string(),
  })
)
