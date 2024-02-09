import { ICategory, IImage, ISize, ITag, IType } from ".";

export interface IProduct {
    _id?         : string

    title        : string
    description  : string
    price        : number
    slug         : string
    inStock      : number
    images       : IImage[]
    sizes        : ISize[]  
    tags         : ITag[]
    type         : IType[]
    category     : ICategory[]
    sku          : string
    discountRate?: number

    active       : boolean
    status       : boolean

    createdAt?   : string
    updatedAt?   : string
}