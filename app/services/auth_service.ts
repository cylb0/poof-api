import User from '#models/user'
import { RegisterPayload } from '#types/auth'

export default class AuthService {
  constructor() {}

  async register(data: RegisterPayload): Promise<User> {
    const user = await User.create(data)
    return user
  }

  serializeUser(user: User) {
    const serializedUser = user.serialize({
      fields: {
        pick: ['id', 'email', 'createdAt'],
      },
    })
    return serializedUser
  }
}
