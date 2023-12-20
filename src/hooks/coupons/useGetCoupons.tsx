import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'

import { COUPONS_QUERY_KEY } from '@/constants'


interface Props {
    page: number
}
export const useGetCoupons = ({ page }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)
    
    const couponsQuery = useQuery({
        queryKey: [COUPONS_QUERY_KEY, { page:currentPage } ],
        queryFn: ()=>  couponActions.getCoupons( currentPage ),
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
