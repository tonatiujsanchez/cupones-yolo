import { DashboardLayout, UsersList } from '@/components'
import styles from './UsersPage.module.scss'
import { useGetUsers } from '@/hooks'

const UsersPage = () => {

    const { usersQuery } = useGetUsers({ page: 1, count: 20 })

    console.log(usersQuery.data)

    return (
        <DashboardLayout headding="Usuarios">
            <div className={ styles['users__list-container'] }>
                <UsersList />
            </div>
        </DashboardLayout>
    )
}

export default UsersPage