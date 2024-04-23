export interface IBrand {
    _id?   : string

    title  : string
    slug   : string
    image  : string | null

    active : boolean
    status : boolean
    
    createdAt? : string
    updatedAt? : string
}

export interface IBrandsResp {
    currentPage: number
    totalPages : number
    pageSize   : number
    totalBrands: number
    brands     : IBrand[]
}