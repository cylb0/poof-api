import User from '#models/user'
import Story from '#models/story'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { Roles } from '#enums/roles'

export default class StoryPolicy extends BasePolicy {
  async before(user: User) {
    if (user === null) {
      return false
    }
    if (user.roleId === Roles.ADMIN) return true
  }

  index(user: User): AuthorizerResponse {
    return false
  }

  show(user: User, story: Story): AuthorizerResponse {
    return false
  }

  store(user: User): AuthorizerResponse {
    return false
  }

  update(user: User, story: Story): AuthorizerResponse {
    return false
  }

  destoy(user: User, story: Story): AuthorizerResponse {
    return false
  }
}
