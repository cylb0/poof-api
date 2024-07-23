import User from '#models/user'
import Scene from '#models/scene'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'

export default class ScenePolicy extends BasePolicy {
  async before(user: User) {
    if (user === null) return false
    if (user.roleId === Roles.ADMIN) return true
  }

  index(user: User): AuthorizerResponse {
    return false
  }

  show(user: User, scene: Scene): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User, scene: Scene): AuthorizerResponse {
    return false
  }

  destroy(user: User, scene: Scene): AuthorizerResponse {
    return false
  }
}
