import Story from '#models/story'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Story.create({
      name: 'story_test',
      description: 'story for testing',
      userId: 1,
    })
  }
}
