import { SceneElementType } from '#enums/assets'
import SceneElement from '#models/scene_element'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await SceneElement.create({
      sceneId: 1,
      publicAssetId: 1,
      type: SceneElementType.IMAGE,
      from: 10,
      duration: 10,
    })
  }
}
