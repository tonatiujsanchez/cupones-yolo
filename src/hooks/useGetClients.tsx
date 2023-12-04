import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'


interface Props {
    page: number
}
export const useGetClients = ({ page }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)

    const clientsQuery = useQuery({
        queryKey: ['issues', { currentPage }],
        queryFn: ()=> couponActions.getClients( currentPage ),
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
