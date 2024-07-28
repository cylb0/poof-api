import { FORBIDDEN_MESSAGE, RESOURCE_UPDATE_SUCCESS } from '#constants/api_response_messages'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('PATCH /users/:id', (group) => {
  let admin: User | null
  let user: User | null
  let newEmail = 'test@test.com'

  group.setup(async () => {
    admin = await User.find(1)
    user = await User.find(2)
  })
  test('should update a user when data is valid', async ({ client }) => {
    const response = await client
      .patch(`/users/${user!.id}`)
      .json({ email: newEmail })
      .loginAs(admin!)

    response.assertStatus(200)
    response.assertBodyContains({
      message: RESOURCE_UPDATE_SUCCESS,
      data: {
        email: newEmail,
      },
    })
  })

  test('should return a 404 when id is invalid', async ({ client }) => {
    const response = await client.patch(`/users/999`).json({ email: newEmail }).loginAs(admin!)

    response.assertStatus(404)
    response.assertBodyContains({
      error: 'User not found.',
    })
  })

  test('should not return a 422 when email is already used by current user', async ({ client }) => {
    const response = await client
      .patch(`/users/${admin!.id}`)
      .json({
        email: admin!.email,
      })
      .loginAs(admin!)

    response.assertStatus(200)
    response.assertBodyContains({
      message: RESOURCE_UPDATE_SUCCESS,
      data: {
        id: admin!.id,
      },
    })
  })

  test('should return a 422 when email is already used', async ({ client }) => {
    const response = await client
      .patch(`/users/${user!.id}`)
      .json({
        email: admin!.email,
      })
      .loginAs(admin!)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          rule: 'database.unique',
          field: 'email',
        },
      ],
    })
  })

  test('should return a 403 when trying to update a user without authorization', async ({
    client,
  }) => {
    const response = await client
      .patch(`/users/${user!.id}`)
      .json({ email: newEmail })
      .loginAs(user!)

    response.assertStatus(403)
    response.assertBodyContains({
      message: FORBIDDEN_MESSAGE,
    })
  })
})
