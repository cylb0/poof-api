import RowNotFoundException from '#exceptions/row_not_found_exception'
import PublicAsset from '#models/public_asset'
import { PublicAssetCreationPayload, PublicAssetUpdatePayload } from '#types/public_assets'

/**
 * Service that handles public assets objects related operations
 */
export default class PublicAssetService {
  /**
   * Entity name as displayed in exception messages
   */
  entityName = 'Public asset'

  constructor() {}

  /**
   * Retrieves all public assets
   */
  async all() {
    return await PublicAsset.all()
  }

  /**
   * Retrieves a single public asset by its ID
   * @param id - The ID of the public asset to retrieve
   * @throws - A {@link RowNotFoundException} when no public asset is found
   */
  async show(id: number) {
    try {
      return await PublicAsset.findOrFail(id)
    } catch (error) {
      throw new RowNotFoundException(this.entityName)
    }
  }

  /**
   * Creates a new public asset
   * @param data - The data to create the public asset with
   */
  async store(data: PublicAssetCreationPayload) {
    const publicAsset = await PublicAsset.create(data)
    return await publicAsset.save()
  }

  /**
   * Updates an existing public asset
   * @param publicAsset - The public asset to update
   * @param data - The data to update the public asset with
   */
  async update(publicAsset: PublicAsset, data: PublicAssetUpdatePayload) {
    return await publicAsset.merge(data).save()
  }

  /**
   * Deletes a public asset
   * @param publicAsset - The public asset to delete
   */
  async destroy(publicAsset: PublicAsset) {
    return await publicAsset.delete()
  }
}
