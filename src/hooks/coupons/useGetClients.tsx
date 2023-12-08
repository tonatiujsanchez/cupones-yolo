import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'

import { REGISTERS_QUERY_KEY } from '@/constants'


interface Props {
    page      : number
    searchTerm: string
}
export const useGetClients = ({ page, searchTerm }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)

    const clientsQuery = useQuery({
        queryKey: [ REGISTERS_QUERY_KEY, { page: currentPage, searchTerm }],
        queryFn: ()=> couponActions.getClients( currentPage, searchTerm ),
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
