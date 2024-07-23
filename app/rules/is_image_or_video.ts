import { Assets } from '#enums/assets'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
}

async function isImageOrVideo(value: unknown, options: Options, field: FieldContext) {
  /**
   * Avoid dealing with non string values
   */
  if (typeof value !== 'number') return

  const row = await db.from(options.table).where(options.column, value).first()

  const isAssetOk = row.type === Assets.IMAGE || row.type === Assets.VIDEO
  console.log(isAssetOk)
  if (!isAssetOk) {
    field.report(
      'The {{field}} field does not correspond to an `Image` or a `Video`',
      'assetType',
      field
    )
  }
}

/**
 * Converts function to VineJS rule
 */
export const imageOrVideoRule = vine.createRule(isImageOrVideo)
