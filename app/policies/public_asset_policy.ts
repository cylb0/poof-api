import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'

export default class PublicAssetPolicy extends BasePolicy {
  async before(user: User | null) {
    if (user === null) {
      return false
    }
    return user.roleId === Roles.ADMIN
  }

  show(user: User): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User): AuthorizerResponse {
    return false
  }

  delete(user: User): AuthorizerResponse {
    return false
  }
}
