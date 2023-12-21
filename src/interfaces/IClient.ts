import { ICoupon } from "./ICoupon"


export interface IClient {
    _id?        : string
 
    name        : string
    phone       : number
    birthdate   : Date
    email?      : string | null
    receivePromotions: boolean
    registeredAt: Date
    coupons     : ICoupon[] | string[]
    couponsSent : boolean

    status      : boolean

    createdAt?  : string
    updatedAt?  : string
}

export type IClientsResp = {
    currentPage  : number
    totalPages   : number
    totalClientes: number
    pageSize     : number
    clients      : IClient[]
}

export interface IClientFormData {
    name: string
    phone: number | null
    birthdate: Date
    email: string
    receivePromotions: boolean
}

export type ICouponsSentOptions = '' | 'enviados' | 'pendientes'

export interface ICouponsSent {
    value: ICouponsSentOptions
    label: string
}