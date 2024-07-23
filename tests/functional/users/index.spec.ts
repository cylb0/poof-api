import { FORBIDDEN_MESSAGE, RESOURCE_LIST_FOUND } from '#constants/api_response_messages'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('GET /users', (group) => {
  let admin: User | null
  let user: User | null

  group.setup(async () => {
    admin = await User.find(1)
    user = await User.find(2)
  })
  test('should return a list of users', async ({ assert, client }) => {
    const response = await client.get('/users').loginAs(admin!)
    response.assertStatus(200)
    response.assertBodyContains({
      message: RESOURCE_LIST_FOUND,
    })
    assert.isArray(response.body().data)
    assert.lengthOf(response.body().data, 2)
  })

  test('should return a 403 unauthorized when trying to access route without authorization', async ({
    client,
  }) => {
    const response = await client.get('/users').loginAs(user!)
    response.assertStatus(403)
    response.assertBodyContains({
      message: FORBIDDEN_MESSAGE,
    })
  })
})
