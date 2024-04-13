import { PRODUCTS_QUERY_KEY } from "@/constants"
import { productsActions } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


interface Props {
    page      : number
    searchTerm: string
}
export const useGetProducts = ({ page, searchTerm }: Props) => {
    
    const [currentPage, setCurrentPage] = useState(page)
    
    const productsQuery = useQuery({
        queryKey : [ PRODUCTS_QUERY_KEY, { page: currentPage, searchTerm }],
        queryFn  : ()=> productsActions.getProducts({ page: currentPage, searchTerm }),
        staleTime: 1000 * 60 * 60,
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }    

    return {
        productsQuery,
        handlePageClick
    }
}
