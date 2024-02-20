import { useState } from 'react'
import { CategoryForm, ModalContainer, SettingsListSection } from '@/components'


export const CategoryList = () => {

    const [openFormCategory, setOpenFormCategory] = useState<boolean>(false)

    const onCloseFormSectionModal = () => {
        setOpenFormCategory(false)
    }


    return (
        <>        
            <SettingsListSection
                title="Categorias"
                onClick = { ()=> setOpenFormCategory(true) }
            >
                 Hola
                 {/* TODO: Listar categorias */}
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
