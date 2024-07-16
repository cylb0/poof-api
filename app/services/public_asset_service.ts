import PublicAsset from '#models/public_asset'
import { PublicAssetCreationPayload, PublicAssetUpdatePayload } from '#types/public_assets'

/**
 * Service that handles public assets objects related operations
 */
export default class PublicAssetService {
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
   */
  async findOne(id: number) {
    const publicAsset = await PublicAsset.findOrFail(id)
    return publicAsset
  }

  /**
   * Creates a new public asset
   * @param data - The data to create the public asset with
   */
  async create(data: PublicAssetCreationPayload) {
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
  async delete(publicAsset: PublicAsset) {
    return await publicAsset.delete()
  }
}
