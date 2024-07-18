import PrivateAsset from '#models/private_asset'
import { PrivateAssetCreationPayload, PrivateAssetUpdatePayload } from '#types/private_asset'

/**
 * Service that handles private assets objects related operations
 */
export default class PrivateAssetService {
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
   */
  async findOne(id: number) {
    const privateAsset = await PrivateAsset.findOrFail(id)
    return privateAsset
  }

  /**
   * Creates a new private asset
   * @param data - The data to create the private asset with
   */
  async create(data: PrivateAssetCreationPayload) {
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
  async delete(privateAsset: PrivateAsset) {
    return await privateAsset.delete()
  }
}
