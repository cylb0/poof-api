import User from '#models/user'
import { UserCreationPayload, UserUpdatePayload } from '../types/user.js'

/**
 * Service that handles user objects related operations
 */
export default class UserService {
  constructor() {}

  /**
   * Retrieves all users
   */
  async all() {
    return await User.all()
  }

  /**
   * Find a single user by its ID
   *
   * @param id - The ID of the user to retrieve
   */
  async findOne(id: number) {
    const user = await User.findOrFail(id)
    return user
  }

  /**
   * Creates a new user
   *
   * @param data - The data to create a user with
   */
  async create(data: UserCreationPayload): Promise<User> {
    const user = await User.create(data)
    return await user.save()
  }

  /**
   * Updates a user
   *
   * @param user - The user to update
   * @param data - The data to update the user with
   */
  async update(user: User, data: UserUpdatePayload): Promise<User> {
    return await user.merge(data).save()
  }

  /**
   * Deletes a user
   *
   * @param user - The user to delete
   */
  async delete(user: User) {
    return await user.delete()
  }
}
