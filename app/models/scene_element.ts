import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Scene from '#models/scene'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { SceneElementType } from '#enums/assets'
import PublicAsset from '#models/public_asset'
import PrivateAsset from '#models/private_asset'
import type { Dimensions, Position } from '#types/scene_element'

/**
 * Defines the scene element model
 */
export default class SceneElement extends BaseModel {
  /**
   * Unique identifier for the scene element
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Foreign key referencing the `Scene` model
   */
  @column()
  declare sceneId: number

  /**
   * BelongsTo relationship with the `Scene` model
   */
  @belongsTo(() => Scene)
  declare scene: BelongsTo<typeof Scene>

  /**
   * Type of the scene element
   */
  @column()
  declare type: SceneElementType

  /**
   * (Optional) Z-index of the scene element, a higher number means
   * the element is positioned over its siblings.
   */
  @column()
  declare zIndex?: number

  /**
   * Foreign key referencing the `PublicAsset` model
   */
  @column()
  declare publicAssetId: number

  /**
   * BelongsTo relationship with the `PublicAsset` model
   */
  @belongsTo(() => PublicAsset)
  declare publicAsset: BelongsTo<typeof PublicAsset>

  /**
   * Foreign key referencing the `PrivateAsset` model
   */
  @column()
  declare privateAssetId: number

  /**
   * BelongsTo relationship with the `PrivateAsset` model
   */
  @belongsTo(() => PrivateAsset)
  declare privateAsset: BelongsTo<typeof PrivateAsset>

  /**
   * (Optional) Text content in case of a text scene element
   */
  @column()
  declare textContent?: string

  /**
   * Time in seconds when the scene element appears in the video
   */
  @column()
  declare from: number

  /**
   * Duration in seconds of the scene element
   */
  @column()
  declare duration: number

  /**
   * (Optional) Position of the scene element
   */
  @column()
  declare position?: Position

  /**
   * (Optional) Dimension of the scene element
   */
  @column()
  declare dimensions?: Dimensions

  /**
   * (Optional) Asset specific metadata
   */
  @column()
  declare metadata?: JSON

  /**
   * Timestamp of the scene element creation
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp of the scene element update
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
