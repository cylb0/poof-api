import { Assets } from '#enums/assets'
import PublicAsset from '#models/public_asset'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await PublicAsset.create({
      type: Assets.IMAGE,
      filename: 'public_image.jpg',
    })
  }
}
