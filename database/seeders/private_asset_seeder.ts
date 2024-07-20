import { Assets } from '#enums/assets'
import PrivateAsset from '#models/private_asset'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await PrivateAsset.create({
      type: Assets.IMAGE,
      filename: 'private_image.jpg',
      userId: 1,
    })
  }
}
