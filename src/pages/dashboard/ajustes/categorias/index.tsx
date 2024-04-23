import { CategoryList, DashboardLayout } from '@/components'
import styles from './Categorias.module.scss'

const CategoriasPage = () => {
    return (
        <DashboardLayout headding="Categorías">
            <div className={styles['settings']}>
                <CategoryList />
            </div>
        </DashboardLayout>
    )
}

export default CategoriasPage