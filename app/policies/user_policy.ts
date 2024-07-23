import { Roles } from '#enums/roles'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  async before(user: User | null, action: string, ...params: any[]) {
    if (user === null) {
      return false
    }

    /**
     * Prevent a user from deleting himself
     */
    if (action === 'delete' && user.id === params[0].id) {
      return false
    }

    if (user.roleId === Roles.ADMIN) return true
  }

  index(user: User): AuthorizerResponse {
    return false
  }

  show(user: User, userToShow: User): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User, userToEdit: User): AuthorizerResponse {
    return false
  }

  delete(user: User, userToDelete: User): AuthorizerResponse {
    return false
  }
}
