/**
 * Interface representing the payload of scene creation
 */
export interface SceneCreationPayload {
  duration: number
  storyId: number
  backgroundColor?: string
  publicAssetId?: number
  privateAssetId?: number
}

/**
 * Interface representing the payload of scene update
 */
export interface SceneUpdatePayload {
  duration?: number
  backgroundColor?: string
  publicAssetId?: number
  privateAssetId?: number
}
