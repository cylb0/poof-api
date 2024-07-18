import { Roles } from '#enums/roles'
import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
    roleId: vine.enum(Roles).optional(),
  })
)

/**
 * Validates the user's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    password: vine.string().optional(),
    roleId: vine.number().optional(),
  })
)
