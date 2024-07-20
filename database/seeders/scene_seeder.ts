import Scene from '#models/scene'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Scene.create({
      duration: 5.7,
      storyId: 1,
      publicAssetId: 1,
    })
  }
}
