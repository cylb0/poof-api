import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('#database/seeders/role_seeder'))
    await this.seed(await import('#database/seeders/user_seeder'))
    await this.seed(await import('#database/seeders/public_asset_seeder'))
    await this.seed(await import('#database/seeders/private_asset_seeder'))
    await this.seed(await import('#database/seeders/story_seeder'))
    await this.seed(await import('#database/seeders/scene_seeder'))
    await this.seed(await import('#database/seeders/scene_element_seeder'))
  }
}
