import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'

import { REGISTERS_QUERY_KEY } from '@/constants'
import { ICouponsSentOptions } from '@/interfaces'




interface Props {
    page       : number
    searchTerm : string
    couponsSent: ICouponsSentOptions
    month :string
    year  :string
}
export const useGetClients = ({ page, searchTerm, couponsSent, month, year }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)

    const clientsQuery = useQuery({
        queryKey: [ REGISTERS_QUERY_KEY, { page: currentPage, searchTerm, couponsSent, month, year }],
        queryFn: ()=> couponActions.getClients( currentPage, searchTerm, couponsSent, month, year ),
        staleTime: 1000 * 60 * 60,
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }    
    
    return {
        clientsQuery,
        handlePageClick
    }
}
