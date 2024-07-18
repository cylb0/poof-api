import { Assets } from "#enums/assets";

/**
 * Interface representing the payload of private asset creation
 */
export interface PrivateAssetCreationPayload {
    type: Assets
    filename: string
    userId: number
}

/**
 * Interface representing the payload of private asset update
 */
export interface PrivateAssetUpdatePayload {
    filename?: string
}