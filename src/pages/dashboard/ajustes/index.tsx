import { CategoryList, DashboardLayout, ProductTypesList } from '@/components'
import styles from './Settings.module.scss'

const SettingsPage = () => {

    return (
        <DashboardLayout headding="Ajustes">
            <div className={ styles['settings'] }>
                <CategoryList />
                <ProductTypesList />
            </div>
        </DashboardLayout>
    )
}

export default SettingsPage
