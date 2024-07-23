import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class RowNotFoundException extends Exception {
  static status = 404
  static code = 'E_ROW_NOT_FOUND'
  static message = ''

  constructor(entity: string) {
    super()
    this.message = `${entity} not found.`
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.notFound({ error: error.message })
  }
}
