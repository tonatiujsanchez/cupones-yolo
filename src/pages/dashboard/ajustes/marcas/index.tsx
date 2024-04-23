import { DashboardLayout } from '@/components'
import styles from './Marcas.module.scss'

const MarcasPage = () => {
    return (
        <DashboardLayout headding="Marcas">
            <div className={styles['settings']}>
                <div>Marcas List</div>
            </div>
        </DashboardLayout>
    )
}

export default MarcasPage