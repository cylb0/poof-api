import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

/**
 * Options accepted by the unique rule
 */
type Options = {
  table: string
  column: string
}

async function unique(value: unknown, options: Options, field: FieldContext) {
  /**
   * Avoid dealing with non string values
   */
  if (typeof value !== 'string') return

  const row = await db.from(options.table).where(options.column, value).first()

  if (row) {
    field.report('The {{field}} field is not unique', 'database.unique', field)
  }
}

/**
 * Converts function to a vineJS rule
 */
export const uniqueRule = vine.createRule(unique)
