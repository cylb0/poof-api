import Scene from '#models/scene'
import { SceneCreationPayload, SceneUpdatePayload } from '#types/scene'

/**
 * Service that manages scenes objects related operations
 */
export default class SceneService {
  constructor() {}

  /**
   * Returns all scenes
   */
  async all() {
    const scenes = await Scene.all()
    return scenes
  }

  /**
   * Retrieves a single scene by its ID
   * @param id - The ID of the scene to retrieve
   */
  async findOne(id: number) {
    const scene = await Scene.findOrFail(id)
    return scene
  }

  /**
   * Creates a new scene
   *
   * @param data - The data to create a new scene with
   */
  async create(data: SceneCreationPayload) {
    const scene = await Scene.create(data)
    return scene
  }

  /**
   * Updates an existing scene
   *
   * @param scene - The scene to update
   * @param data - The data to update the scene with
   */
  async update(scene: Scene, data: SceneUpdatePayload) {
    return await scene.merge(data).save()
  }

  /**
   * Deletes a scene
   * @param scene - The scene to delete
   */
  async delete(scene: Scene) {
    return await scene.delete()
  }
}
