import { DashboardLayout, LinkPrimary, ProductList } from '@/components'
import styles from './ProductsAdminPage.module.scss'

const ProductsAdminPage = () => {

    return (
        <DashboardLayout headding="Productos">
            <div className={ styles['products__link-container']} >
                <LinkPrimary
                    href={'/dashboard/productos/nuevo'}
                >
                    Nuevo producto
                </LinkPrimary>
            </div>
            <div className={ styles['products__list-container'] } >
                <ProductList />
            </div>
        </DashboardLayout>
    )
}

export default ProductsAdminPage