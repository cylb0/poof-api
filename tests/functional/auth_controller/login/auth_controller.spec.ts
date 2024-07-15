import User from '#models/user'
import { test } from '@japa/runner'

test.group('POST /login', (group) => {
  const validEmail = 'valid@valid.com'
  const validPassword = '123456789aA!'

  group.setup(async () => {
    const user = new User()
    user.email = validEmail
    user.password = validPassword
    await user.save()
  })

  test('should successfully log a user', async ({ client }) => {
    const response = await client.post('/login').json({
      email: validEmail,
      password: validPassword,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      message: 'Logged in.',
      token: {
        type: 'bearer',
      },
      user: {
        email: validEmail,
      },
    })
  })

  test('should throw an error when email is invalid', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'invalid@invalid.com',
      password: validPassword,
    })

    response.assertStatus(400)
    response.assertBodyContains({
      errors: [
        {
          message: 'Invalid user credentials',
        },
      ],
    })
  })

  test('should throw an error when password is invalid', async ({ client }) => {
    const response = await client.post('/login').json({
      email: validEmail,
      password: '123',
    })

    response.assertStatus(400)
    response.assertBodyContains({
      errors: [
        {
          message: 'Invalid user credentials',
        },
      ],
    })
  })
})
