import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Scene from './scene.js'

/**
 * Describes the story model
 */
export default class Story extends BaseModel {
  /**
   * Unique identifier for the story
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Name of the story
   */
  @column()
  declare name: string

  /**
   * Description of the story
   */
  @column()
  declare description: string

  /**
   * Timestamp of the story creation
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp of the story update
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

  /**
   * HasMany relastionship with the `Scene` model
   */
  @hasMany(() => Scene)
  declare scenes: HasMany<typeof Scene>
}
