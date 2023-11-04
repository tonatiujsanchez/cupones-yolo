import { IClient } from "./IClient"

export interface ICoupon {
    _id?       : string
 
    value      : number
    issuedAt   : string | Date
    expiredAt  : string | Date
    exchangedAt: Date   | null
    folio      : string
    client     : string | IClient
    
    status     : boolean
    
    createdAt? : string
    updatedAt? : string
}


export interface CouponsResp {
    count: number
    page: number,
    totalPages: number
    totalCoupons: number
    coupons: ICoupon[]
}