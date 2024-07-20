import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Story from '#models/story'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PublicAsset from '#models/public_asset'
import PrivateAsset from '#models/private_asset'
import SceneElement from './scene_element.js'

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
   * Background color for the scene
   */
  @column()
  declare backgroundColor?: string

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

  /**
   * Foreign key referencing the `PublicAsset` model
   */
  @column()
  declare publicAssetId?: number

  /**
   * BelongsTo relationship with the `PublicAsset` model
   */
  @belongsTo(() => PublicAsset)
  declare publicAsset: BelongsTo<typeof PublicAsset>

  /**
   * Private key referencing the `PrivateAsset` model
   */
  @column()
  declare privateAssetId?: number

  /**
   * BelongsTo relationship with the `PrivateAsset` model
   */
  @belongsTo(() => PrivateAsset)
  declare privateAsset: BelongsTo<typeof PrivateAsset>

  /**
   * HasMany relationship with the `SceneElement` model
   */
  @hasMany(() => SceneElement)
  declare sceneElements: HasMany<typeof SceneElement>

  /**
   * Checks if the model has a `PublicAsset` relationship
   */
  hasPublicAsset() {
    return this.publicAsset !== null
  }

  /**
   * Checks if the model has a `PrivateAsset` relationship
   */
  hasPrivateAsset() {
    return this.privateAsset !== null
  }

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
