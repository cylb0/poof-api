import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'
import PublicAsset from '#models/public_asset'

export default class PublicAssetPolicy extends BasePolicy {
  async before(user: User | null) {
    if (user === null) {
      return false
    }
    return user.roleId === Roles.ADMIN
  }

  index(user: User): AuthorizerResponse {
    return false
  }

  show(user: User, publicAsset: PublicAsset): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User, publicAsset: PublicAsset): AuthorizerResponse {
    return false
  }

  destroy(user: User, publicAsset: PublicAsset): AuthorizerResponse {
    return false
  }
}
