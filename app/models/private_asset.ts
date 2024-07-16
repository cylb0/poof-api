import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Assets } from '#enums/assets'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * Defines the private asset model
 */
export default class PrivateAsset extends BaseModel {
  /**
   * Unique identifier of the private asset
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Type of the asset referencing the `Assets` enum
   */
  @column()
  declare type: Assets

  /**
   * Filename of the public asset
   */
  @column()
  declare filename: string

  /**
   * Timestamp of the public asset creation
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp of the public asset update
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Foreign key referencing the `User` model
   */
  @column()
  declare userId: number

  /**
   * BelongsTo relationship with the `User` model
   */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
