import User from '#models/user'
import vine from '@vinejs/vine'

/**
 * Validator for the story creation payload
 */
export const createStoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255).optional(),
    description: vine.string().optional(),
    userId: vine.number().exists(async (query, field) => {
      const user = (await query.from('users').where('id', field).first()) as User
      return !!user
    }),
  })
)

/**
 * Validator for the story update payload
 */
export const updateStoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255).optional(),
    description: vine.string().optional(),
  })
)
