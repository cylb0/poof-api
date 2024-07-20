/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const PrivateAssetsController = () => import('#controllers/private_assets_controller')
const PublicAssetsController = () => import('#controllers/public_assets_controller')
const SceneElementsController = () => import('#controllers/scene_elements_controller')
const ScenesController = () => import('#controllers/scenes_controller')
const StoriesController = () => import('#controllers/stories_controller')
const UsersController = () => import('#controllers/users_controller')

router.resource('private-assets', PrivateAssetsController).apiOnly().use('*', middleware.auth())

router
  .resource('public-assets', PublicAssetsController)
  .apiOnly()
  .use('*', middleware.auth())
  .apiOnly()

router
  .resource('scene-elements', SceneElementsController)
  .apiOnly()
  .use('*', middleware.auth())
  .apiOnly()

router.resource('scenes', ScenesController).apiOnly().use('*', middleware.auth()).apiOnly()

router.resource('stories', StoriesController).apiOnly().use('*', middleware.auth()).apiOnly()

router.post('login', [AuthController, 'login'])

router.post('register', [AuthController, 'register'])

router.resource('users', UsersController).apiOnly().use('*', middleware.auth())
