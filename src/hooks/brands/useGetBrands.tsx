import { brandsActions } from '@/services'
import { BRANDS_QUERY_KEY } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface Props {
    page: number
}
export const useGetBrands = ({ page }:Props) => {
    
    const [currentPage, setCurrentPage] = useState(page)

    const brandsQuery = useQuery({
        queryKey : [BRANDS_QUERY_KEY, { page: currentPage }],
        queryFn  : () => brandsActions.getBrands({ page: currentPage }),
        staleTime: 1000 * 60 * 60,
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }

    return {
        brandsQuery,
        handlePageClick
    }
}
