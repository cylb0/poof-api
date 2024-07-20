import SceneElement from '#models/scene_element'
import { SceneElementCreationPayload } from '#types/scene_element'

/**
 * Service that handles scene element objects related operations
 */
export default class SceneElementService {
  constructor() {}

  /**
   * Retrieves all scene elements
   */
  async all() {
    const sceneElements = await SceneElement.all()
    return sceneElements
  }

  /**
   * Retrieves on scene element by its ID
   *
   * @param id - The ID of the scene element to retrieve
   */
  async findOne(id: number) {
    const sceneElement = await SceneElement.findOrFail(id)
    return sceneElement
  }

  /**
   * Creates a new scene element
   *
   * @param data - The data to create the new scene element with
   */
  async create(data: SceneElementCreationPayload) {
    const sceneElement = await SceneElement.create(data)
    return sceneElement
  }

  /**
   * Checks if a payload for scene element creation has a content
   *
   * @param payload - The payload to check for a content
   */
  payloadHasContent(payload: SceneElementCreationPayload): number {
    const contentCount =
      (payload.publicAssetId !== undefined ? 1 : 0) +
      (payload.privateAssetId !== undefined ? 1 : 0) +
      (payload.textContent !== undefined ? 1 : 0)

    return contentCount
  }
}
