import User from '#models/user'
import SceneElement from '#models/scene_element'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'

export default class SceneElementPolicy extends BasePolicy {
  async before(user: User) {
    if (user === null) return false
    if (user.roleId === Roles.ADMIN) return true
  }

  index(user: User): AuthorizerResponse {
    return false
  }

  show(user: User, sceneElement: SceneElement): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User, sceneElement: SceneElement): AuthorizerResponse {
    return false
  }

  destroy(user: User, sceneElement: SceneElement): AuthorizerResponse {
    return false
  }
}
