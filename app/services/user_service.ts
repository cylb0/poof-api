import RowNotFoundException from '#exceptions/row_not_found_exception'
import User from '#models/user'
import { UserCreationPayload, UserUpdatePayload } from '../types/user.js'

/**
 * Service that handles user objects related operations
 */
export default class UserService {
  /**
   * Entity name as displayed in exception messages
   */
  entityName = 'User'

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
   * @throws - A RowNotFoundException when no user is found
   */
  async show(id: number) {
    try {
      return await User.findOrFail(id)
    } catch (error) {
      throw new RowNotFoundException(this.entityName)
    }
  }

  /**
   * Creates a new user
   *
   * @param data - The data to create a user with
   */
  async store(data: UserCreationPayload): Promise<User> {
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
  async destroy(user: User) {
    return await user.delete()
  }
}
