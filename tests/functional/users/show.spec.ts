import { FORBIDDEN_MESSAGE, RESOURCE_FOUND } from '#constants/api_response_messages'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('GET /users/:id', (group) => {
  let admin: User | null
  let user: User | null

  group.setup(async () => {
    admin = await User.find(1)
    user = await User.find(2)
  })
  test('should return a user when id is valid', async ({ client }) => {
    const response = await client.get(`/users/${user!.id}`).loginAs(admin!)

    response.assertStatus(200)
    response.assertBodyContains({
      message: RESOURCE_FOUND,
      data: {
        id: user!.id,
      },
    })
  })

  test(`should return a 404 when id doesn't exist`, async ({ client }) => {
    const response = await client.get('/users/99').loginAs(admin!)
    response.assertStatus(404)
  })

  test('should return a 403 when trying to access a user without authorization', async ({
    client,
  }) => {
    const response = await client.get(`/users/${user!.id}`).loginAs(user!)

    response.assertStatus(403)
    response.assertBodyContains({
      message: FORBIDDEN_MESSAGE,
    })
  })
})
