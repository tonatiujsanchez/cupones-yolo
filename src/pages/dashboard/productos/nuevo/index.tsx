import { DashboardLayout, ProductForm } from '@/components'
import styles from './NewProductPage.module.scss'

const NewProductPage = () => {

    return (
        <DashboardLayout headding="Nuevo producto">
            <ProductForm />
        </DashboardLayout>
    )
}

export default NewProductPage