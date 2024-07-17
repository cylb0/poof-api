import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}
