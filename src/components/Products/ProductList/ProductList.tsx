import { useState } from 'react'
import { useGetProducts } from '@/hooks'

import styles from './ProductList.module.scss'
import { ModalContainer, ModalDelete, ProductTable } from '@/components'
import { IProduct } from '@/interfaces'


export const ProductList = () => {

    
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [deleteProduct, setDeleteProduct] = useState<IProduct>()

    const { productsQuery, handlePageClick } = useGetProducts({
        page: 1,
        searchTerm
    })

    const onCloseModal = () => {
        setDeleteProduct(undefined)
    }

    const onSetDeleteProduct = (product:IProduct) => {
        setDeleteProduct(product)
    }

    const onDeleteProduct = ( confirm:boolean ) => {
        if( !confirm || !deleteProduct ){
            return onCloseModal()
        }

        // categoryDeleteMutation.mutate({ idCategory: deleteCategory._id! })
    }


    return (
        <>
            <div>
                <div>
                    Filters
                </div>
                {
                    productsQuery.isLoading && (
                        <div className={ styles['loader-container'] }>
                            <span className="loader-cube"></span>
                        </div>
                    )
                }
                {
                    !productsQuery.isLoading && productsQuery.data && (
                        <>
                            <ProductTable
                                products={ productsQuery.data.products }
                                currentPage={ productsQuery.data.currentPage }
                                onDeleteProduct={ onSetDeleteProduct }

                            />
                        </>
                    )
                }
            </div>
            <ModalContainer
                show={ !!deleteProduct }
                onHidden={ ()=> setDeleteProduct(undefined) }
            >
                <ModalDelete
                    title="Eliminar producto"
                    subtitle={
                        <p>
                            ¿Desea eliminar el producto <strong>{ deleteProduct?.title }</strong>?
                        </p>
                    }
                    onChange={ onCloseModal }
                    isDeleting={ false }
                />
            </ModalContainer>
        </>
    )
}
