import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Story from '#models/story'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * Defines the scene model
 */
export default class Scene extends BaseModel {
  /**
   * Unique identifier for the scene
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Duration of the scene in seconds
   */
  @column()
  declare duration: number

  /**
   * Timestamp for scene creation
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp for scene update
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Foreign key referencing the `Story` model
   */
  @column()
  declare storyId: number

  /**
   * BelongsTo relationship with the `Story` model
   */
  @belongsTo(() => Story)
  declare story: BelongsTo<typeof Story>
}
