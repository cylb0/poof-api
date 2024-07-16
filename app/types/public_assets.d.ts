import { Assets } from "#enums/assets";

/**
 * Interface representing the payload of public asset creation
 */
export interface PublicAssetCreationPayload {
    type: Assets
    filename: string
}

/**
 * Interface representing the payload of public asset update
 */
export interface PublicAssetUpdatePayload {
    filename?: string
}