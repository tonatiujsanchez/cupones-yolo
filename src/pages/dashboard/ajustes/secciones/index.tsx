import { DashboardLayout, SectionList } from '@/components'
import styles from './Secciones.module.scss'

const SeccionesPage = () => {
    return (
        <DashboardLayout headding="Ajustes">
            <div className={styles['settings']}>
                <SectionList />
            </div>
        </DashboardLayout>
    )
}

export default SeccionesPage