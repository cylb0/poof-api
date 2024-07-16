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
const UsersController = () => import('#controllers/users_controller')

router.resource('private-assets', PrivateAssetsController).apiOnly().use('*', middleware.auth())

router.resource('public-assets', PublicAssetsController).apiOnly().use('*', middleware.auth())

router.post('login', [AuthController, 'login'])

router.post('register', [AuthController, 'register'])

router.resource('users', UsersController).apiOnly().use('*', middleware.auth())
