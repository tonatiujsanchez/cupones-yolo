import { useState } from 'react'
import { CategoryForm, ModalContainer, SettingsListSection } from '@/components'
import { useGetCategories } from '@/hooks'


export const CategoryList = () => {

    const [openFormCategory, setOpenFormCategory] = useState<boolean>(false)
    const {  categoriesQuery  } = useGetCategories({ page: 1 })

    const onCloseFormSectionModal = () => {
        setOpenFormCategory(false)
    }
    

    return (
        <>        
            <SettingsListSection
                title="Categorias"
                onClick = { ()=> setOpenFormCategory(true) }
            >
                 {
                    categoriesQuery.data
                    ?(
                        categoriesQuery.data.categories.map( category => (
                            <p key={ category._id }>{ category.title }</p>
                        ))
                    ):(
                        <p>Sin data</p>
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
