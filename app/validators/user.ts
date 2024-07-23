import { Roles } from '#enums/roles'
import vine from '@vinejs/vine'
import { uniqueRule } from '../rules/unique.js'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string(),
    roleId: vine.enum(Roles).optional(),
  })
)

/**
 * Validates the user's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      })
      .optional(),
    password: vine.string().optional(),
    roleId: vine.number().optional(),
  })
)
