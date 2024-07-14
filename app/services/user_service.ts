import User from '#models/user'
import { UserCreationPayload, UserUpdatePayload } from '../types/user.js'

export default class UserService {
  constructor() {}

  async all() {
    return await User.all()
  }

  async findOne(id: number) {
    const user = await User.findOrFail(id)
    return user
  }

  async create(data: UserCreationPayload): Promise<User> {
    const user = await User.create(data)
    return await user.save()
  }

  async update(user: User, data: UserUpdatePayload): Promise<User> {
    return await user.merge(data).save()
  }

  async delete(user: User) {
    return await user.delete()
  }
}
