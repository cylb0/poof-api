import { test } from '@japa/runner'

test.group('GET /users', () => {
  test('should return a 401 error when unauthorized', async ({ client }) => {
    const response = await client.get('/users')
    response.assertStatus(401)
  })
})
