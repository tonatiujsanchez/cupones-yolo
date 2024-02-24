import { ICategory, IImage, ISize, ITag, IProductType } from ".";

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
    ProductType  : IProductType[]
    category     : ICategory[]
    sku          : string
    discountRate?: number

    active       : boolean
    status       : boolean

    createdAt?   : string
    updatedAt?   : string
}