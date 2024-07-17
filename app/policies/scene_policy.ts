import User from '#models/user'
import Scene from '#models/scene'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'

export default class ScenePolicy extends BasePolicy {
  async before(user: User) {
    if (user === null) return false
    return user.roleId === Roles.ADMIN
  }

  index(user: User) {
    return false
  }

  show(user: User, scene: Scene) {
    return false
  }

  create(user: User) {
    return false
  }

  update(user: User, scene: Scene) {
    return false
  }

  destroy(user: User, scene: Scene) {
    return false
  }
}
