import { test } from '@japa/runner'

test.group('POST /register', () => {
  const validEmail = 'test@mail.com'
  const validPassword = '123456789aA!'
  const invalidEmail = 'test@'
  test('should register a user with valid credentials', async ({ client }) => {
    const response = await client.post('/register').json({
      email: validEmail,
      password: validPassword,
    })

    response.assertStatus(201)
    response.assertBodyContains({ email: validEmail })
  })

  test('should deny creating a user with an already used email', async ({ client }) => {
    await client.post('/register').json({
      email: validEmail,
      password: validPassword,
    })
    const response = await client.post('/register').json({
      email: validEmail,
      password: validPassword,
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'The email has already been taken',
        },
      ],
    })
  })

  test('should throw an error when email is invalid', async ({ client }) => {
    const response = await client.post('/register').json({
      email: invalidEmail,
      password: validPassword,
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'The email field must be a valid email address',
        },
      ],
    })
  })

  test('should throw an error when password is too short', async ({ client }) => {
    const response = await client.post('/register').json({
      email: validEmail,
      password: '123',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          rule: 'minLength',
          field: 'password',
        },
      ],
    })
  })

  test(`should throw an error when password doesn't comply with regex`, async ({ client }) => {
    const response = await client.post('/register').json({
      email: validEmail,
      password: '0123456789ab',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          rule: 'regex',
          field: 'password',
        },
      ],
    })
  })

  test(`should throw an error when password is not a string`, async ({ client }) => {
    const response = await client.post('/register').json({
      email: validEmail,
      password: {},
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          rule: 'string',
          field: 'password',
        },
      ],
    })
  })
})
