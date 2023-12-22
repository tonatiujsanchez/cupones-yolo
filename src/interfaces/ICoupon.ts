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

export type ICouponsResp = {
    currentPage  : number,
    totalPages   : number
    totalCoupons : number
    pageSize     : number
    coupons      : ICoupon[]
}

export type IStatusCouponExchangeOptions = '' | 'canjeados' | 'sin_canjear' | 'expirados'


export interface IStatusCouponExchange {
    value:IStatusCouponExchangeOptions
    label:string
}