import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * Defines the role model
 */
export default class Role extends BaseModel {
  /**
   * Unique identifier for the role
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Description of the role
   */
  @column()
  declare role: string

  /**
   * Timestamp of the role creation
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp of the role update
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * HasMany relationship with the `User` model
   */
  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
