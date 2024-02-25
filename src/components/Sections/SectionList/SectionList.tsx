import { useState } from 'react'
import { ModalContainer, SectionForm, SettingsListSection } from '@/components'
import { ISection } from '@/interfaces'

import styles from './SectionList.module.scss'

export const SectionList = () => {

    const [openSectionForm, setOpenSectionForm] = useState<boolean>(false)
    const [sectionEdit, setSectionEdit] = useState<ISection>()

    const onCloseSectionForm = () => {
        setOpenSectionForm(false)
        setSectionEdit(undefined)
    }


    return (
        <>
            <SettingsListSection
                title='Secciones'
                onClickAdd={ ()=> setOpenSectionForm(true) }
                onClickRefresh={ ()=>{} }
            >
                <p>SECCIONES</p>
            </SettingsListSection>
            <ModalContainer
                show={ openSectionForm || !!sectionEdit }
                onHidden={ onCloseSectionForm }
            >
                <SectionForm
                    section={ sectionEdit }
                    onClose={ onCloseSectionForm }
                />
            </ModalContainer>
        </>
        
    )
}
