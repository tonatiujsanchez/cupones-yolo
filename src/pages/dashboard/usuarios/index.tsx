import { DashboardLayout, UsersList } from '@/components'
import styles from './UsersPage.module.scss'

const UsersPage = () => {

    return (
        <DashboardLayout headding="Usuarios">
            <div className={ styles['users__list-container'] }>
                <UsersList />
            </div>
        </DashboardLayout>
    )
}

export default UsersPage