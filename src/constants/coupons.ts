import { ICouponsSent, IStatusCouponExchange } from "@/interfaces"

export const REGISTERS_QUERY_KEY = 'registers'
export const COUPONS_QUERY_KEY = 'coupons'
export const COUPONS_SETTINGS_PAGE_QUERY_KEY = 'coupons_settings_page'
export const COUPONS_PAGE_SLUG = 'cupones'

export const CLIENTS_PAGE_SIZE = 6
export const COUPONS_PAGE_SIZE = 12

export const OPTIONS_COUPONS_SENT_OF_CLIENT:ICouponsSent[] = [
    {
        value:"",
        label:"Todos"
    },
    {
        value:"enviados",
        label:"Enviados"
    },
    {
        value:"pendientes",
        label:"Pendientes"
    },
]

export const COUPONS_SENT_OPTIONS = [ 'enviados', 'pendientes' ]


export const  STATUS_OPTIONS_COUPON_EXCHANGE:IStatusCouponExchange[] = [
    {
        value: "",
        label: "Todos"
    },
    {
        value: "canjeados",
        label: "Canjeados"
    },
    {
        value: "sin_canjear",
        label: "Sin canjear"
    },
    {
        value: "expirados",
        label: "Expirados"
    },
]

export const COUPON_EXCHANGE_OPTIONS = [ 'canjeados', 'sin_canjear', 'expirados' ]
