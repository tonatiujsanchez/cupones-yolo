export interface ISize {
    _id?      : string
    value     : string
    label     : string

    active    : boolean
    status?   : boolean

    createdAt?: string
    updatedAt?: string
}

export interface ISizesResp {
    currentPage: number
    totalPages : number
    pageSize   : number
    totalSizes : number
    sizes      : ISize[]
}