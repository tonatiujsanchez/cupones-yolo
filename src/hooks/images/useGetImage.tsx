import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { imagesActions } from '@/services'
import { IMAGES_QUERY_KEY } from '@/constants'

interface Props {
    section: string
    page   : number
    count? : number
}
export const useGetImage = ({ section, page, count }:Props) => {

    const [currentPage, setCurrentPage] = useState(page)

    const imagesQuery = useQuery({
        queryKey:[ IMAGES_QUERY_KEY, { section, page: currentPage } ],
        queryFn: () => imagesActions.getImages({ section, page: currentPage, count }),
        staleTime: 1000 * 60 * 60,
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }  
    
    return {
        imagesQuery,
        handlePageClick
    }
}
