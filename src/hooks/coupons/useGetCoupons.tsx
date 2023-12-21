import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'

import { COUPONS_QUERY_KEY } from '@/constants'
import { IStatusCouponExchangeOptions } from '@/interfaces'


interface Props {
    page      : number
    searchTerm: string
    exchangeStatus: IStatusCouponExchangeOptions
}
export const useGetCoupons = ({ page, searchTerm, exchangeStatus }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)
    
    const couponsQuery = useQuery({
        queryKey: [COUPONS_QUERY_KEY, { page:currentPage, searchTerm, exchangeStatus } ],
        queryFn: ()=>  couponActions.getCoupons( currentPage, searchTerm, exchangeStatus ),
        staleTime: 1000 * 60 * 60,
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }    
    
    return {
        couponsQuery,
        handlePageClick
    }
}
