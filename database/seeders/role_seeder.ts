import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { Roles } from '../../app/enums/roles.js'

export default class RoleSeeder extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.ADMIN,
        role: 'admin',
      },
      {
        id: Roles.USER,
        role: 'user',
      },
    ])
  }
}
