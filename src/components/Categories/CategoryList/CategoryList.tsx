import { useState } from 'react'
import { CategoryForm, CategoryTable, ErrorMessage, ModalContainer, SettingsListSection } from '@/components'
import { useGetCategories } from '@/hooks'

import styles from './CategoryList.module.scss'


export const CategoryList = () => {

    const [openFormCategory, setOpenFormCategory] = useState<boolean>(false)
    const {  categoriesQuery  } = useGetCategories({ page: 1 })

    const onCloseFormSectionModal = () => {
        setOpenFormCategory(false)
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
                        />
                    )
                }
            </SettingsListSection>
            <ModalContainer
                show={ openFormCategory }
                onHidden={ onCloseFormSectionModal }
            >
                <CategoryForm onClose={ onCloseFormSectionModal  }  />
            </ModalContainer>
        </>
    )
}
