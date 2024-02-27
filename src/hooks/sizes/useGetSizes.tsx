import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { sizesActions } from '@/services'
import { SIZES_QUERY_KEY } from '@/constants'

interface Props {
    page: number
}
export const useGetSizes = ({ page }:Props) => {
    
    const [currentPage, setCurrentPage] = useState(page)

    const sizesQuery = useQuery({
        queryKey:[ SIZES_QUERY_KEY, { page: currentPage } ],
        queryFn : () => sizesActions.getSizes({ page: currentPage }),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }

    return {
        sizesQuery,
        handlePageClick
    }
}
