import RowNotFoundException from '#exceptions/row_not_found_exception'
import SceneElement from '#models/scene_element'
import { SceneElementCreationPayload, SceneElementUpdatePayload } from '#types/scene_element'

/**
 * Service that handles scene element objects related operations
 */
export default class SceneElementService {
  /**
   * Entity name as displayed in exception messages
   */
  entityName = 'Scene element'

  constructor() {}

  /**
   * Retrieves all scene elements
   */
  async index() {
    const sceneElements = await SceneElement.all()
    return sceneElements
  }

  /**
   * Retrieves on scene element by its ID
   *
   * @param id - The ID of the scene element to retrieve
   * @throws - A {@link RowNotFoundException} when no row is found
   */
  async show(id: number) {
    try {
      return await SceneElement.findOrFail(id)
    } catch (error) {
      throw new RowNotFoundException(this.entityName)
    }
  }

  /**
   * Creates a new scene element
   *
   * @param data - The data to create the new scene element with
   */
  async store(data: SceneElementCreationPayload) {
    const sceneElement = await SceneElement.create(data)
    return sceneElement
  }

  /**
   * Updates an existing scene element
   *
   * @param sceneElement - The scene element to update
   * @param payload - The payload to merge with the object
   */
  async update(sceneElement: SceneElement, payload: SceneElementUpdatePayload) {
    if (payload.textContent !== undefined) {
      return sceneElement.merge({
        ...payload,
        publicAssetId: null,
        privateAssetId: null,
      })
    }

    if (payload.publicAssetId !== undefined) {
      return sceneElement.merge({
        ...payload,
        privateAssetId: null,
        textContent: null,
      })
    }

    if (payload.privateAssetId !== undefined) {
      return sceneElement.merge({
        ...payload,
        publicAssetId: null,
        textContent: null,
      })
    }

    return sceneElement.save()
  }

  /**
   * Deletes an existing scene element
   *
   * @param sceneElement - The scene element to delete
   */
  async destroy(sceneElement: SceneElement) {
    return await sceneElement.delete()
  }

  /**
   * Checks if a payload for scene element creation has a content
   *
   * @param payload - The payload to check for a content
   */
  payloadHasContent(payload: SceneElementCreationPayload | SceneElementUpdatePayload): number {
    const contentCount =
      (payload.publicAssetId !== undefined ? 1 : 0) +
      (payload.privateAssetId !== undefined ? 1 : 0) +
      (payload.textContent !== undefined ? 1 : 0)

    return contentCount
  }
}
