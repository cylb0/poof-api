import { FORBIDDEN_MESSAGE, RESOURCE_DELETE_SUCCESS } from '#constants/api_response_messages'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('DELETE /users/:id', (group) => {
  let admin: User | null
  let user: User | null

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.setup(async () => {
    admin = await User.find(1)
    user = await User.find(2)
  })

  test('should delete a user when id is valid', async ({ assert, client }) => {
    const response = await client.delete(`/users/${user!.id}`).loginAs(admin!)
    const deletedUser = await User.find(user!.id)

    response.assertStatus(200)
    response.assertBodyContains({
      message: RESOURCE_DELETE_SUCCESS,
    })
    assert.isNull(deletedUser)
  })

  test('should return a 404 when id is invalid', async ({ client }) => {
    const response = await client.delete(`/users/999`).loginAs(admin!)

    response.assertStatus(404)
    response.assertBodyContains({
      error: 'User not found.',
    })
  })

  test('should return a 403 when trying to update a user without authorization', async ({
    client,
  }) => {
    const response = await client.delete(`/users/${user!.id}`).loginAs(user!)

    response.assertStatus(403)
    response.assertBodyContains({
      message: FORBIDDEN_MESSAGE,
    })
  })
})
