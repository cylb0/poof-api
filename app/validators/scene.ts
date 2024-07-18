import vine from '@vinejs/vine'

/**
 * Validator for scene creation payload
 */
export const createSceneValidator = vine.compile(
  vine.object({
    duration: vine.number(),
    storyId: vine.number(),
  })
)

/**
 * Validator for scene update payload
 */
export const updateSceneValidator = vine.compile(
  vine.object({
    duration: vine.number().optional(),
  })
)
