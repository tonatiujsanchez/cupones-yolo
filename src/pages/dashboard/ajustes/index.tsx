import { CategoryList, DashboardLayout, SettingsListSection } from '@/components'
import styles from './Settings.module.scss'

const SettingsPage = () => {

    return (
        <DashboardLayout headding="Ajustes">
            <div className={ styles['settings'] }>
                <CategoryList />
            </div>
        </DashboardLayout>
    )
}

export default SettingsPage