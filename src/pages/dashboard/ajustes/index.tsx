import { CategoryList, DashboardLayout, SectionList, SizeList } from '@/components'
import styles from './Settings.module.scss'

const SettingsPage = () => {

    return (
        <DashboardLayout headding="Ajustes">
            <div className={ styles['settings'] }>
                <CategoryList />
                <SectionList />
                <SizeList />
            </div>
        </DashboardLayout>
    )
}

export default SettingsPage
