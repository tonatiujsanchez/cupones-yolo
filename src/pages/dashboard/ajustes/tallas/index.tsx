import { DashboardLayout, SizeList } from '@/components'
import styles from './Tallas.module.scss'

const TallasPage = () => {
    return (
        <DashboardLayout headding="Tallas">
            <div className={styles['settings']}>
                <SizeList />
            </div>
        </DashboardLayout>
    )
}

export default TallasPage