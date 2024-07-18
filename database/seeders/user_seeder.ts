import { Roles } from '#enums/roles'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'admin@admin.com',
        password: 'passwordadmin',
        roleId: Roles.ADMIN,
      },
      {
        email: 'user@user.com',
        password: 'passworduser',
      },
    ])
  }
}
