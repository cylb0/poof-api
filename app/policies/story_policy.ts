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
    return user.roleId === Roles.ADMIN
  }

  show(user: User) {
    return false
  }

  store(user: User) {
    return false
  }

  update(user: User, story: Story) {
    return false
  }

  delete(user: User, story: Story) {
    return false
  }
}
