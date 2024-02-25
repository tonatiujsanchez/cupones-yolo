export interface ISection {
    _id?      : string

    title     : string
    slug      : string
    cover     : string | null

    active    : boolean
    status?   : boolean

    createdAt?: string
    updatedAt?: string
}

export interface ISectionsResp {
    currentPage  : number
    totalPages   : number
    pageSize     : number
    totalSections: number
    sections     : ISection[]
}