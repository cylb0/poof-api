import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'
import PrivateAsset from '#models/private_asset'

export default class PrivateAssetPolicy extends BasePolicy {
  async before(user: User | null) {
    if (user === null) {
      return false
    }
    return user.roleId === Roles.ADMIN
  }

  index(user: User): AuthorizerResponse {
    return false
  }

  show(user: User, privateAsset: PrivateAsset): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User, privateAsset: PrivateAsset): AuthorizerResponse {
    return false
  }

  destroy(user: User, privateAsset: PrivateAsset): AuthorizerResponse {
    return false
  }
}
