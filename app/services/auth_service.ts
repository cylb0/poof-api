import User from '#models/user'
import { RegisterPayload } from '#types/auth'

export default class UserService {
  constructor() {}

  async register(data: RegisterPayload): Promise<User> {
    const user = await User.create(data)
    return user
  }
}
