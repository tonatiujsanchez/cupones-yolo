import { useState } from 'react'
import { ModalContainer, ProductTypesForm, SettingsListSection } from '@/components'
import { IProductType } from '@/interfaces'

import styles from './ProductTypesList.module.scss'

export const ProductTypesList = () => {

    const [openFormProductTypes, setOpenFormProductTypes] = useState<boolean>(false)
    const [productTypesEdit, setProductTypesEdit] = useState<IProductType>()

    const onCloseFormSectionModal = () => {
        setOpenFormProductTypes(false)
        setProductTypesEdit(undefined)
    }


    return (
        <>
            <SettingsListSection
                title='Tipos de procuctos'
                onClickAdd={ ()=> setOpenFormProductTypes(true) }
                onClickRefresh={ ()=>{} }
            >
                <p>Tipos</p>
            </SettingsListSection>
            <ModalContainer
                show={ openFormProductTypes || !!productTypesEdit }
                onHidden={ onCloseFormSectionModal }
            >
                <ProductTypesForm
                    productType={ productTypesEdit }
                    onClose={ onCloseFormSectionModal }
                />
            </ModalContainer>
        </>
        
    )
}
