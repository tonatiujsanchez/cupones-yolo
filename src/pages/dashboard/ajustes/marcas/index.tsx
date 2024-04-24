import { BrandList, DashboardLayout } from '@/components'
import styles from './Marcas.module.scss'

const MarcasPage = () => {
    return (
        <DashboardLayout headding="Marcas">
            <div className={styles['settings']}>
                <BrandList />
            </div>
        </DashboardLayout>
    )
}

export default MarcasPage