export interface ICategory {
    _id?      : string

    title     : string
    slug      : string
    cover     : string | null
    pinned    : boolean
    
    active    : boolean
    status    : boolean

    createdAt?: string
    updatedAt?: string
}