import { DashboardLayout, LinkPrimary } from '@/components'
import styles from './ProductsAdminPage.module.scss'

const ProductsAdminPage = () => {
  return (
    <DashboardLayout headding="Productos">
      <div className={ styles['products__link-container'] }>        
        <LinkPrimary
          href={'/dashboard/productos/nuevo'}
        >
            Nuevo producto
        </LinkPrimary>
      </div>
    </DashboardLayout>
  )
}

export default ProductsAdminPage