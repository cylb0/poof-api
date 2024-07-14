import { Roles } from '#enums/roles'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  async before(user: User | null, action: string, ...params: any[]) {
    return user && user.roleId === Roles.ADMIN
  }

  show(user: User): AuthorizerResponse {
    return false
  }

  create(user: User): AuthorizerResponse {
    return false
  }

  edit(user: User, userToEdit: User): AuthorizerResponse {
    return false
  }

  delete(user: User, userToDelete: User): AuthorizerResponse {
    return false
  }
}
