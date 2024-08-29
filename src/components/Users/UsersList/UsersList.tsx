import { useState } from 'react'
import { useGetUsers } from '@/hooks'
import { RegisterCount, Pagination, UserTable } from '@/components'
import { USERS_PAGE_SIZE } from '@/constants'

import styles from './UsersList.module.scss'

export const UsersList = () => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const { usersQuery, handlePageClick } = useGetUsers({
        page: 1,
        count: 20,
        searchTerm
    })

    console.log(usersQuery.data)

    return (
        <div className={styles['user-list'] }>
            <div>
                Filters
            </div>
            {
                usersQuery.isLoading && (
                    <div className={styles['loader-container']}>
                        <span className="loader-cube"></span>
                    </div>
                )
            }
            {
                !usersQuery.isLoading && usersQuery.data && (
                    <>
                        <UserTable
                            users={usersQuery.data.users}
                            currentPage={usersQuery.data.currentPage}
                            searchTerm={searchTerm}
                        />
                        <div className={styles['pagination-container']}>
                            <Pagination
                                currentPage={usersQuery.data.currentPage}
                                onPageChange={handlePageClick}
                                pageCount={usersQuery.data.totalPages}
                            />
                            <RegisterCount
                                pageSize={USERS_PAGE_SIZE}
                                currentPage={usersQuery.data.currentPage}
                                currentPageSize={usersQuery.data.pageSize}
                                totalClientes={usersQuery.data.totalUsers}
                            />
                        </div>
                    </>
                )

            }

        </div>
    )
}
