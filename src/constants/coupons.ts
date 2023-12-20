import { ICouponsSent } from "@/interfaces"

export const REGISTERS_QUERY_KEY = 'registers'
export const COUPONS_QUERY_KEY = 'coupons'

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