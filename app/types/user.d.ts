/**
 * Type representing the payload of User creation
 */
export interface UserCreationPayload {
    email: string
    password: string
    roleId?: number
}

/**
 * Type representing the payload of User update
 */
export interface UserUpdatePayload {
    email?: string
    password?: string
    roleId?: number
}