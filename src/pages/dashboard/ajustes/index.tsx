import { CategoryList, DashboardLayout, SectionList } from '@/components'
import styles from './Settings.module.scss'

const SettingsPage = () => {

    return (
        <DashboardLayout headding="Ajustes">
            <div className={ styles['settings'] }>
                <CategoryList />
                <SectionList />
            </div>
        </DashboardLayout>
    )
}

export default SettingsPage
