import { test } from '@japa/runner'
import { ApiClient } from '@japa/api-client'
import User from '#models/user'
import SceneElement from '#models/scene_element'
import { SceneElementType } from '#enums/assets'

test.group('POST /scene-elements should', (group) => {
  let token: any
  let baseSceneElement = {} as Partial<SceneElement>
  baseSceneElement.sceneId = 1
  baseSceneElement.type = SceneElementType.IMAGE
  baseSceneElement.from = 10
  baseSceneElement.duration = 10

  group.setup(async () => {
    const user = new User()
    user.email = 'admin@admin.com'
    user.password = 'passwordadmin'
    const apiResponse = await new ApiClient().post('/login').json(user)
    token = apiResponse.response.body.token.value
  })

  test('should return a bad request if no content is provided', async ({ client }) => {
    const sceneElement = {
      ...baseSceneElement,
    }
    const response = await client
      .post('/scene-elements')
      .headers({ Authorization: `Bearer ${token}` })
      .json(sceneElement)
    response.assertStatus(400)
    response.assertBodyContains({ message: 'A content is required.' })
  })

  test('should return a bad request if more than one content is provided', async ({ client }) => {
    const sceneElement = {
      ...baseSceneElement,
      publicAssetId: 1,
      privateAssetId: 1,
    }
    const response = await client
      .post('/scene-elements')
      .headers({ Authorization: `Bearer ${token}` })
      .json(sceneElement)
    response.assertStatus(400)
    response.assertBodyContains({ message: 'Only one asset can be provided.' })
  })

  test(`should throw an error if sceneId doesn't match an existing scene`, async ({ client }) => {
    const sceneElement = {
      ...baseSceneElement,
      sceneId: 2,
      publicAssetId: 1,
    }
    const response = await client
      .post('/scene-elements')
      .headers({ Authorization: `Bearer ${token}` })
      .json(sceneElement)
    response.assertStatus(422)
  })

  test(`should throw an error if asset doesn't match an existing public asset`, async ({
    client,
  }) => {
    const sceneElement = {
      ...baseSceneElement,
      publicAssetId: 2,
    }
    const response = await client
      .post('/scene-elements')
      .headers({ Authorization: `Bearer ${token}` })
      .json(sceneElement)
    response.assertStatus(422)
  })

  test('should create a scene element if payload is valid', async ({ client }) => {
    const sceneElement = {
      ...baseSceneElement,
      privateAssetId: 1,
    }
    const response = await client
      .post('/scene-elements')
      .headers({ Authorization: `Bearer ${token}` })
      .json(sceneElement)
    response.assertStatus(201)
    response.assertBodyContains(sceneElement)
  })
})
