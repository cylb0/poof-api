import { test } from '@japa/runner'

test.group('GET /users', () => {
  test('should return a 403 error when unauthorized', async ({ client }) => {
    const response = await client.get('/users')
    response.assertStatus(403)
    response.assertBody({ message: `You cannot access this resource.` })
  })
})
