import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Role from '#models/role'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PrivateAsset from '#models/private_asset'
import Story from '#models/story'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

/**
 * Defines the user model with authentication
 * @extends BaseModel
 * @extends AuthFinder
 */
export default class User extends compose(BaseModel, AuthFinder) {
  /**
   * Unique identifier for the user
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * The user's email address
   */
  @column()
  declare email: string

  /**
   * The hashed password of the user. Not serialized for security matter.
   */
  @column({ serializeAs: null })
  declare password: string

  /**
   * Timestamp of user creation
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp of user update
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  /**
   * Access token provider for the user model
   */
  static accessTokens = DbAccessTokensProvider.forModel(User)

  /**
   * Foreign key referencing the `Role` model
   */
  @column()
  declare roleId: number

  /**
   * BelongsTo relationship with the `Role` model
   */
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  /**
   * HasMany relationship with the `PrivateAsset` model
   */
  @hasMany(() => PrivateAsset)
  declare privateAssets: HasMany<typeof PrivateAsset>

  /**
   * HasMany relationship with the `Story` model
   */
  @hasMany(() => Story)
  declare stories: HasMany<typeof Story>
}
