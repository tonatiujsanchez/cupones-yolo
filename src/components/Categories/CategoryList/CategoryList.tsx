import { useState } from 'react'
import { CategoryForm, CategoryTable, ErrorMessage, ModalContainer, SettingsListSection } from '@/components'
import { useGetCategories } from '@/hooks'

import styles from './CategoryList.module.scss'
import { ICategory } from '@/interfaces'


export const CategoryList = () => {

    const [openFormCategory, setOpenFormCategory] = useState<boolean>(false)
    const [categoryEdit, setCategoryEdit] = useState<ICategory>()
    const {  categoriesQuery  } = useGetCategories({ page: 1 })

    const onCloseFormSectionModal = () => {
        setOpenFormCategory(false)
        setCategoryEdit( undefined )
        
    }
    
    const onEditCategory = (category:ICategory) => {
        setCategoryEdit(category)
    }

    return (
        <>        
            <SettingsListSection
                title="Categorías"
                onClick = { ()=> setOpenFormCategory(true) }
            >
                {    categoriesQuery.isLoading && (
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
                    categoriesQuery.data && (
                        <CategoryTable 
                            categories={ categoriesQuery.data.categories }
                            currentPage={ categoriesQuery.data.currentPage }
                            onEditCategory={ onEditCategory }
                        />
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
                />
            </ModalContainer>
        </>
    )
}
