/**
 * Interface representing the payload of story creation
 */
export interface StoryCreationPayload {
    name?: string
    description?: string,
    userId: number,
}

/**
 * Interface representing the payload of story update
 */
export interface StoryUpdatePayload {
    name?: string
    description?: string
}