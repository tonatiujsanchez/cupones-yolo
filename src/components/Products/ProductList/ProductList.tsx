import { useState } from 'react'
import { useDeleteProduct, useGetProducts } from '@/hooks'
import { ModalContainer, ModalDelete, Pagination, ProductTable, RegisterCount } from '@/components'
import { IProduct } from '@/interfaces'
import styles from './ProductList.module.scss'
import { PRODUCTS_PAGE_SIZE } from '@/constants'



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

    const { productDeleteMutation } =  useDeleteProduct({ 
        currentPage: 1, 
        searchTerm, 
        onClose: onCloseModal 
    })

    const onSetDeleteProduct = (product:IProduct) => {
        setDeleteProduct(product)
    }

    const onDeleteProduct = ( confirm:boolean ) => {
        if( !confirm || !deleteProduct ){
            return onCloseModal()
        }

        productDeleteMutation.mutate({ idProduct: deleteProduct._id! })
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
                                onDeleteProduct={ onSetDeleteProduct }
                                currentPage={ productsQuery.data.currentPage }
                                searchTerm={ searchTerm }

                            />
                            <div className={ styles['pagination-container'] }>
                                <Pagination
                                    currentPage={ productsQuery.data.currentPage }
                                    onPageChange={ handlePageClick }
                                    pageCount={ productsQuery.data.totalPages }
                                />
                                <RegisterCount
                                    pageSize={ PRODUCTS_PAGE_SIZE }
                                    currentPage={ productsQuery.data.currentPage }
                                    currentPageSize={ productsQuery.data.pageSize }
                                    totalClientes={ productsQuery.data.totalProducts }
                                />
                            </div>
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
                    onChange={ onDeleteProduct }
                    isDeleting={ productDeleteMutation.isPending }
                />
            </ModalContainer>
        </>
    )
}
