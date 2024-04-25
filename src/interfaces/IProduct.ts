import { ICategory, IImage, ISize, ISection, IBrand } from ".";

export interface IProduct {
    _id?         : string

    title        : string
    description  : string
    price        : number
    slug         : string
    inStock      : IInStockProduct[]
    images       : IImage[]
    tags         : string[]
    sections     : ISection[]
    category     : ICategory[]
    brands       : IBrand[]
    sku          : string
    discountRate?: number

    // cupouns      : string[]

    active       : boolean
    status       : boolean

    createdAt?   : string
    updatedAt?   : string
}

export interface IProductsResp {
    currentPage  : number
    totalPages   : number
    pageSize     : number
    totalProducts: number
    products     : IProduct[]
}

export interface IInStockProduct {
    size    : ISize
    quantity: number
}