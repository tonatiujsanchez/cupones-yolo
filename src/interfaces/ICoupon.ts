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

export interface ICouponLite {
    value: number
    title: string
}

export interface ICouponSettingsForm {
    pageTitle             : string
    pageSubtitle          : string
    dateToRegisterStart   : Date
    dateToRegisterEnd     : Date
    coupons               : ICouponLite[]
    congratulationTitle   : string
    congratulationSubtitle: string
    conditions            : string
    couponValidityStart   : Date
    couponValidityEnd     : Date
}