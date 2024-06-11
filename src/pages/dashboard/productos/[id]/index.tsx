import React from 'react'
import { useRouter } from 'next/router'
import { DashboardLayout, LoadingYolostyle, ProductForm } from '@/components'
import { useGetProduct } from '@/hooks'
import styles from './EditProductPage.module.scss'

interface IQueryParam {
    id         : string
    page?      : string
    searchTerm?: string
}
const EditProductPage = () => {

    const router = useRouter()
    // const { id } = router.query as IQueryParam
    const { id, page=1, searchTerm='' } = router.query as unknown as IQueryParam

    const { productQuery } = useGetProduct({ idProduct: id })

    return (
        <DashboardLayout headding="Editar producto">
            {
                productQuery.isLoading
                ?(
                    <div className={ styles['loader-container'] }>
                        <LoadingYolostyle />
                    </div>
                ):(
                    <ProductForm 
                        product={ productQuery.data }
                        page={ Number(page) }
                        searchTerm={ searchTerm }
                    />
                )
            }
        </DashboardLayout>
    )
}

export default EditProductPage