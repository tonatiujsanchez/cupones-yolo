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


export interface ClientResp {
    page      : number,
    totalPages: number
    totalClientes: number
    count     : number
    clients   : IClient[]
}


export interface ClientFormData {
    name: string
    phone: number | null
    birthdate: Date
    email: string
    receivePromotions: boolean
}