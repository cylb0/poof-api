import vine from '@vinejs/vine'

/**
 * Validator for the story creation payload
 */
export const createStoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255).optional(),
    description: vine.string().optional(),
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
