import RowNotFoundException from '#exceptions/row_not_found_exception'
import PrivateAsset from '#models/private_asset'
import { PrivateAssetCreationPayload, PrivateAssetUpdatePayload } from '#types/private_asset'

/**
 * Service that handles private assets objects related operations
 */
export default class PrivateAssetService {
  /**
   * Entity name as displayed in exception messages
   */
  entityName = 'Private asset'

  constructor() {}

  /**
   * Retrieves all private assets
   */
  async all() {
    return await PrivateAsset.all()
  }

  /**
   * Retrieves a single private asset by its ID
   * @param id - The ID of the private asset to retrieve
   * @throws - A {@link RowNotFoundException} when no row is found
   */
  async show(id: number) {
    try {
      return await PrivateAsset.findOrFail(id)
    } catch (error) {
      throw new RowNotFoundException(this.entityName)
    }
  }

  /**
   * Creates a new private asset
   * @param data - The data to create the private asset with
   */
  async store(data: PrivateAssetCreationPayload) {
    const privateAsset = await PrivateAsset.create(data)
    return await privateAsset.save()
  }

  /**
   * Updates an existing private asset
   * @param privateAsset - The private asset to update
   * @param data - The data to update the private asset with
   */
  async update(privateAsset: PrivateAsset, data: PrivateAssetUpdatePayload) {
    return await privateAsset.merge(data).save()
  }

  /**
   * Deletes a private asset
   * @param privateAsset - The public asset to delete
   */
  async destroy(privateAsset: PrivateAsset) {
    return await privateAsset.delete()
  }
}
