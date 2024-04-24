import { useState } from 'react'
import { BrandForm, BrandTable, ErrorMessage, ModalContainer, ModalDelete, Pagination, RegisterCount, SettingsListSection } from '@/components'
import { useGetBrands } from '@/hooks'
import { BRANDS_PAGE_SIZE } from '@/constants'
import { IBrand } from '@/interfaces'
import styles from './BrandList.module.scss'

export const BrandList = () => {

    const [openFormBrand, setOpenFormBrand] = useState<boolean>(false)
    const [brandEdit, setBrandEdit] = useState<IBrand>()

    const { brandsQuery, handlePageClick } = useGetBrands({ page: 1 })

    const onCloseFormBrandModal = () => {
        setOpenFormBrand(false)
        setBrandEdit(undefined)
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
                                onEditBrand={ ()=>{} }
                                onDeleteBrand={ ()=>{} }
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
        </>
    )
}
