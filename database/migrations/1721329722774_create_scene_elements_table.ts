import { SceneElementType } from '#enums/assets'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'scene_elements'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('scene_id').unsigned().references('scenes.id').onDelete('CASCADE')
      table.enum('type', Object.values(SceneElementType)).notNullable()
      table.integer('z_index')
      table
        .integer('public_asset_id')
        .unsigned()
        .references('public_assets.id')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('private_asset_id')
        .unsigned()
        .references('private_assets.id')
        .onDelete('CASCADE')
        .nullable()
      table.string('text_content').nullable()
      table.float('from')
      table.float('duration')
      table.json('position')
      table.json('dimension')
      table.json('metadata')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
