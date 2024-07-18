import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { Assets } from '#enums/assets'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Scene from '#models/scene'

/**
 * Defines the public asset model
 */
export default class PublicAsset extends BaseModel {
  /**
   * Unique identifier for the public asset
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
   * HasMany relationship with the `Scene` model
   */
  @hasMany(() => Scene)
  declare scenes: HasMany<typeof Scene>
}
