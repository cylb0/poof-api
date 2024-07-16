import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Assets } from '#enums/assets'

export default class PublicAsset extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: Assets

  @column()
  declare filename: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
