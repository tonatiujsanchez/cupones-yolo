import React from 'react'
import { useRouter } from 'next/router'
import { DashboardLayout, LoadingYolostyle, ProductForm } from '@/components'
import { useGetProduct } from '@/hooks'
import styles from './EditProductPage.module.scss'

const EditProductPage = () => {

    const router = useRouter()
    const { id } = router.query as { id: string }


    const { productQuery } = useGetProduct({ idProduct: id })

    if( productQuery.isLoading ){
        return (
            <div className={ styles['loader-container'] }>
               <LoadingYolostyle />
            </div>
        )
    }

    return (
        <DashboardLayout headding="Editar producto">
            <ProductForm product={ productQuery.data } />
        </DashboardLayout>
    )
}

export default EditProductPage