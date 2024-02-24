import { useState } from 'react'
import { CategoryForm, CategoryTable, ErrorMessage, ModalContainer, ModalDelete, Pagination, RegisterCount, SettingsListSection } from '@/components'
import { useDeleteCategory, useGetCategories } from '@/hooks'
import { CATEGORIES_PAGE_SIZE } from '@/constants'
import { ICategory } from '@/interfaces'

import styles from './CategoryList.module.scss'


export const CategoryList = () => {

    const [openFormCategory, setOpenFormCategory] = useState<boolean>(false)
    const [categoryEdit, setCategoryEdit] = useState<ICategory>()
    const [deleteCategory, setDeleteCategory] = useState<ICategory>()

    const { categoriesQuery, handlePageClick } = useGetCategories({ page: 1 })

    const onCloseDeleteCategoryModal = () => {
        setDeleteCategory(undefined)
    }

    const { categoryDeleteMutation } = useDeleteCategory({ 
        currentPage: categoriesQuery.data?.currentPage ?? 1, 
        onClose: onCloseDeleteCategoryModal
    })

    const onCloseFormSectionModal = () => {
        setOpenFormCategory(false)
        setCategoryEdit(undefined)
    }
    
    const onEditCategory = (category:ICategory) => {
        setCategoryEdit(category)
    }

    const onSetDeleteCategory = (category:ICategory) => {
        setDeleteCategory(category)
    }

    const onDeleteCategory = ( confirm:boolean ) => {
        if( !confirm || !deleteCategory ){
            return onCloseDeleteCategoryModal()
        }

        categoryDeleteMutation.mutate({ idCategory: deleteCategory._id! })
    }



    return (
        <>        
            <SettingsListSection
                title="Categorías"
                onClickAdd = { ()=> setOpenFormCategory(true) }
                onClickRefresh={ categoriesQuery.refetch }
            >
                {   categoriesQuery.isFetching && (
                        <div className={ styles['loader-container'] }>
                            <span className="loader-cube"></span>
                        </div>
                    )
                }
                { categoriesQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar las categorías"
                    />
                    )
                }
                {
                    !categoriesQuery.isFetching && categoriesQuery.data && (
                        <>
                            <CategoryTable 
                                categories={ categoriesQuery.data.categories }
                                currentPage={ categoriesQuery.data.currentPage }
                                onEditCategory={ onEditCategory }
                                onDeleteCategory={ onSetDeleteCategory }
                            />
                            <div className={ styles['pagination-container'] }>
                                <Pagination
                                    currentPage={ categoriesQuery.data.currentPage }
                                    onPageChange={ handlePageClick }
                                    pageCount={ categoriesQuery.data.totalPages }
                                />
                                <RegisterCount
                                    pageSize={ CATEGORIES_PAGE_SIZE }
                                    currentPage={ categoriesQuery.data.currentPage }
                                    currentPageSize={ categoriesQuery.data.pageSize }
                                    totalClientes={ categoriesQuery.data.totalCategories }
                                />
                            </div>
                        </>
                    )
                }
            </SettingsListSection>
            <ModalContainer
                show={ openFormCategory || !!categoryEdit }
                onHidden={ onCloseFormSectionModal }
            >
                <CategoryForm
                    onClose={ onCloseFormSectionModal }
                    category={ categoryEdit }
                    currentPage={ categoriesQuery.data?.currentPage ?? 1 }
                />
            </ModalContainer>
            <ModalContainer
                show={ !!deleteCategory }
                onHidden={ onCloseDeleteCategoryModal }
            >
                <ModalDelete
                    title="Eliminar categoría"
                    subtitle={
                        <p>
                            ¿Desea eliminar la categoría <strong>{ deleteCategory?.title }</strong>?
                        </p>
                    }
                    onChange={ onDeleteCategory }
                    isDeleting={ categoryDeleteMutation.isPending }
                />
            </ModalContainer>
        </>
    )
}
