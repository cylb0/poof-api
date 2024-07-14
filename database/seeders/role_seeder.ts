import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { Roles } from '../../app/enums/roles.js'

export default class RoleSeeder extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        role: Roles.ADMIN,
      },
      {
        role: Roles.USER,
      },
    ])
  }
}
