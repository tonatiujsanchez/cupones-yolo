import { IImage, ISize, IType } from ".";

export interface IProduct {
    _id?       : string

    title      : string
    description: string
    price      : number
    slug       : string
    inStock    : number
    images     : IImage[]
    sizes      : ISize[]  
    tags       : string[] //FIXME:
    type       : IType   
    category   : string   //FIXME:

    active     : boolean
    status     : boolean

    createdAt? : string
    updatedAt? : string
}

// export type ISize     = 'XS'|'S'|'M'|'L'|'XL'|'XXL' | 'ONE_SIZE'
// export type IType     = 'shirts'|'pants'|'hoodies'|'hats'
export type ICategory = 'men'|'women'|'kids'|'unisex'