import { useState } from 'react'
import { BrandForm, ErrorMessage, ModalContainer, ModalDelete, Pagination, RegisterCount, SettingsListSection } from '@/components'
import { IBrand } from '@/interfaces'

export const BrandList = () => {

    const [openFormBrand, setOpenFormBrand] = useState<boolean>(false)
    const [brandEdit, setBrandEdit] = useState<IBrand>()

    const onCloseFormBrandModal = () => {
        setOpenFormBrand(false)
        setBrandEdit(undefined)
    }

    return (
        <>
            <SettingsListSection
                title="Marcas"
                onClickAdd = { ()=> setOpenFormBrand(true) }
                onClickRefresh={ ()=>{} }
            >
                Marcas
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
