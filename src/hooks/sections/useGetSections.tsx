import { SECTIONS_QUERY_KEY } from "@/constants"
import { sectionsActions } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


interface Props {
    page: number
}
export const useGetSections = ({ page }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)
    
    const sectionsQuery = useQuery({
        queryKey:[ SECTIONS_QUERY_KEY, { page: currentPage } ],
        queryFn : () => sectionsActions.getSections({ page: currentPage }),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }  
    
    return {
        sectionsQuery,
        handlePageClick
    }
}
