import { FC, useState } from 'react'
import { ButtonPrimary, CategoryForm, ModalContainer } from '@/components'
import { PlusCircleIcon } from '@/components/Icons'

import styles from './SettingsListSection.module.scss'


type ISectionType = 'categories' | 'types' | 'sizes'

interface Props {
    title: string
    sectionSelected: ISectionType
}
export const SettingsListSection:FC<Props> = ({ title, sectionSelected }) => {
    
    const [openFormSeccion, setOpenFormSeccion] = useState<ISectionType>()


    const onCloseFormSectionModal = () => {
        setOpenFormSeccion(undefined)
    }

    return (
        <>
            <section className={styles['settings-section']}>
                <div className={styles['settings-section__header']}>
                    <h3>{ title }</h3>
                    <ButtonPrimary
                        onClick={ () => setOpenFormSeccion( sectionSelected ) }
                    >
                        <PlusCircleIcon />
                    </ButtonPrimary>
                </div>
                Lista de { title }
            </section>
            <ModalContainer
                show={ !!openFormSeccion }
                onHidden={ onCloseFormSectionModal }
            >
                { openFormSeccion === 'categories' && <CategoryForm onClose={ onCloseFormSectionModal  }  /> }
                { openFormSeccion === 'types' && 'Tipos' }
                { openFormSeccion === 'sizes' && 'Tallas' }
            </ModalContainer>
        </>
    )
}
