import { Roles } from '#enums/roles'
import User from '#models/user'
import UserPolicy from '#policies/user_policy'
import { test } from '@japa/runner'

test.group('UserPolicy', () => {
  test('before - should deny access for non logged users', async ({ assert }) => {
    const userPolicy = new UserPolicy()
    const authorized = await userPolicy.before(null, 'show')
    assert.isFalse(authorized)
  })
  test('before - should allow admin users', async ({ assert }) => {
    const user = new User()
    user.roleId = Roles.ADMIN
    const userPolicy = new UserPolicy()
    const authorized = await userPolicy.before(user, 'show')
    assert.isTrue(authorized)
  })
  test('before - should deny non-admin users', async ({ assert }) => {
    const user = new User()
    user.roleId = Roles.USER
    const userPolicy = new UserPolicy()
    const authorized = await userPolicy.before(user, 'show')
    assert.isFalse(authorized)
  })
})
