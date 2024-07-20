import { SceneElementType } from "#enums/assets"

/**
 * Interface representing the payload of a scene element creation
 */
export interface SceneElementCreationPayload {
    sceneId: number
    type: SceneElementType
    zIndex?: number
    publicAssetId?: number
    privateAssetId?: number
    textContent?: string
    from: number
    duration: number
    position?: Position
    dimensions?: Dimensions
    metadata?: any
}

/**
 * Interface representing the payload of a scene element update
 */
export interface SceneElementUpdatePayload {}

/**
 * Interface representing a position with two coordinates x, y
 */
export interface Position {
    /**
     * The coordinate in pixels on the x axis
     */
    x: number
    /**
     * The coordinate in pixels on the y axis
     */
    y: number
}

/**
 * Interface representing dimensions with height and width
 */
export interface Dimensions {
    /**
     * The height in pixels
     */
    height: number
    /**
     * The width in pixels
     */
    width: number
}
