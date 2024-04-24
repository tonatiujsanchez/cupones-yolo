import { useState } from 'react'
import { BrandForm, BrandTable, ErrorMessage, ModalContainer, ModalDelete, Pagination, RegisterCount, SettingsListSection } from '@/components'
import { useDeleteBrand, useGetBrands } from '@/hooks'
import { BRANDS_PAGE_SIZE } from '@/constants'
import { IBrand } from '@/interfaces'
import styles from './BrandList.module.scss'

export const BrandList = () => {

    const [openFormBrand, setOpenFormBrand] = useState<boolean>(false)
    const [brandEdit, setBrandEdit] = useState<IBrand>()
    const [deleteBrand, setDeleteBrand] = useState<IBrand>()

    const { brandsQuery, handlePageClick } = useGetBrands({ page: 1 })

    const onCloseDeleteBrandModal = () => {
        setDeleteBrand(undefined)
    }

    const { brandDeleteMutation } = useDeleteBrand({
        currentPage: brandsQuery.data?.currentPage ?? 1,
        onClose: onCloseDeleteBrandModal
    })

    const onCloseFormBrandModal = () => {
        setOpenFormBrand(false)
        setBrandEdit(undefined)
    }

    const onEditBrand = (brand:IBrand) => {
        setBrandEdit(brand)
    }

    const onSetDeleteCategory = (brand:IBrand) => {
        setDeleteBrand(brand)
    }

    const onDeleteBrand = ( confirm:boolean ) => {
        if( !confirm || !deleteBrand ){
            return onCloseDeleteBrandModal()
        }

        brandDeleteMutation.mutate({ idBrand: deleteBrand._id! })
    }

    return (
        <>
            <SettingsListSection
                title="Marcas"
                onClickAdd = { ()=> setOpenFormBrand(true) }
                onClickRefresh={ brandsQuery.refetch }
            >
                { brandsQuery.isFetching && (
                        <div className={ styles['loader-container'] }>
                            <span className="loader-cube"></span>
                        </div>
                    )
                }
                { brandsQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar las secciones"
                    />
                    )
                }
                 {
                    !brandsQuery.isFetching && brandsQuery.data && (
                    <>
                            <BrandTable 
                                brands={ brandsQuery.data.brands }
                                currentPage={ brandsQuery.data.currentPage }
                                onEditBrand={ onEditBrand }
                                onDeleteBrand={ onSetDeleteCategory }
                            />
                            <div className={ styles['pagination-container'] }>
                                <Pagination
                                    currentPage={ brandsQuery.data.currentPage }
                                    onPageChange={ handlePageClick }
                                    pageCount={ brandsQuery.data.totalPages }
                                />
                                <RegisterCount
                                    pageSize={ BRANDS_PAGE_SIZE }
                                    currentPage={ brandsQuery.data.currentPage }
                                    currentPageSize={ brandsQuery.data.pageSize }
                                    totalClientes={ brandsQuery.data.totalBrands }
                                />
                            </div>
                        </>
                    )
                }
            </SettingsListSection>
            <ModalContainer
                show={ openFormBrand || !!brandEdit }
                onHidden={ onCloseFormBrandModal }
            >
                <BrandForm
                    onClose={ onCloseFormBrandModal }
                    brand={ brandEdit }
                    currentPage={ 1 }
                />
            </ModalContainer>
            <ModalContainer
                show={ !!deleteBrand }
                onHidden={ onCloseDeleteBrandModal }
            >
                <ModalDelete
                    title="Eliminar marca"
                    subtitle={
                        <p>
                            ¿Desea eliminar la marca <strong>{ deleteBrand?.title }</strong>?
                        </p>
                    }
                    onChange={ onDeleteBrand }
                    isDeleting={ brandDeleteMutation.isPending }
                />
            </ModalContainer>
        </>
    )
}
