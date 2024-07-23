import { Roles } from '#enums/roles'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        email: 'admin@admin.com',
        password: 'passwordadmin',
        roleId: Roles.ADMIN,
      },
      {
        id: 2,
        email: 'user@user.com',
        password: 'passworduser',
      },
    ])
  }
}
