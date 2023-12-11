import { ICouponsSent } from "@/interfaces"

export const REGISTERS_QUERY_KEY = 'registers'

export const CLIENTS_PAGE_SIZE = 6

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