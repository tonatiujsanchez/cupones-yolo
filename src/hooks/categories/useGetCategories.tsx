import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { categoriesActions } from '@/services'
import { CATEGORIES_PAGE_SIZE } from '@/constants'


interface Props {
    page: number
}
export const useGetCategories = ({ page }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)

    const categoriesQuery =  useQuery({
        queryKey : [CATEGORIES_PAGE_SIZE, { page: currentPage }],
        queryFn  : () => categoriesActions.getCategories({ page: currentPage }),
        staleTime: 1000 * 60 * 60,
    })
    
    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }  

    return {
        categoriesQuery,
        handlePageClick
    }
}
