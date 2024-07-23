import { FORBIDDEN_MESSAGE, RESOURCE_CREATION_SUCCESS } from '#constants/api_response_messages'
import { Roles } from '#enums/roles'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('/POST users', (group) => {
  let admin: User | null
  let user: User | null
  let validUserCreationData = {
    email: 'test@test.com',
    password: 'passwordtest',
    roleId: Roles.USER,
  }

  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.setup(async () => {
    admin = await User.find(1)
    user = await User.find(2)
  })
  test('should create a user when data is valid', async ({ assert, client }) => {
    const response = await client.post('/users').json(validUserCreationData).loginAs(admin!)

    const createdUser = await User.findBy('email', validUserCreationData.email)

    response.assertStatus(201)
    response.assertBodyContains({
      message: RESOURCE_CREATION_SUCCESS,
      data: {
        email: validUserCreationData.email,
      },
    })
    assert.exists(createdUser)
  })

  test('should return a 422 when email is already used', async ({ client }) => {
    const response = await client
      .post('/users')
      .json({
        email: 'admin@admin.com',
        password: 'passwordadmin',
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

  test('should return a 422 when a field is missing', async ({ client }) => {
    const response = await client.post('/users').json({}).loginAs(admin!)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          rule: 'required',
          field: 'email',
        },
        {
          rule: 'required',
          field: 'password',
        },
      ],
    })
  })

  test('should create a user with role USER when no role is explicitely provided', async ({
    assert,
    client,
  }) => {
    const response = await client
      .post('/users')
      .json({
        ...validUserCreationData,
        roleId: undefined,
      })
      .loginAs(admin!)

    const createdUser = await User.findBy('email', validUserCreationData.email)
    response.assertStatus(201)
    assert.exists(createdUser)
    assert.equal(createdUser?.roleId, Roles.USER)
  })

  test('should return a 403 when trying to create a user without authorization', async ({
    client,
  }) => {
    const response = await client.post('/users').json(validUserCreationData).loginAs(user!)

    response.assertStatus(403)
    response.assertBodyContains({
      message: FORBIDDEN_MESSAGE,
    })
  })
})
