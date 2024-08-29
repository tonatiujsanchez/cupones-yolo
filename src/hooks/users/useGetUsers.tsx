import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usersActions } from '@/services'
import { USERS_QUERY_KEY } from '@/constants'




interface Props {
    page : number
    count: number
}
export const useGetUsers = ({ page, count }:Props) => {
    
    const [currentPage, setCurrentPage] = useState(page)

    const usersQuery = useQuery({
        queryKey:[ USERS_QUERY_KEY, { page: currentPage } ],
        queryFn : () => usersActions.getUsers({ page: currentPage, count }),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })

    const handlePageClick = ( page: number ) => {
        setCurrentPage( page )
    }

    return {
        usersQuery,
        handlePageClick
    }
}
