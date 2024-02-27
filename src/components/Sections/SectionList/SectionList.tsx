import { useState } from 'react'
import { useDeleteSection, useGetSections } from '@/hooks'
import { ErrorMessage, ModalContainer, ModalDelete, Pagination, RegisterCount, SectionForm, SectionTable, SettingsListSection } from '@/components'
import { ISection } from '@/interfaces'

import styles from './SectionList.module.scss'
import { SECTIONS_PAGE_SIZE } from '@/constants'

export const SectionList = () => {

    const [openSectionForm, setOpenSectionForm] = useState<boolean>(false)
    const [sectionEdit, setSectionEdit] = useState<ISection>()
    const [deleteSection, setDeleteSection] = useState<ISection>()

    const { sectionsQuery, handlePageClick } = useGetSections({ page: 1 })

    const { sectionDeleteMutation } = useDeleteSection({
        currentPage: sectionsQuery.data?.currentPage ?? 1,
        onClose: () => setDeleteSection(undefined)
    })


    const onCloseDeleteSectionModal = () => {
        setDeleteSection(undefined)
    }

    const onCloseSectionForm = () => {
        setOpenSectionForm(false)
        setSectionEdit(undefined)
    }

    const onSetEditSection = (section:ISection) => {
        setSectionEdit(section)
    }

    const onSetDeleteSection = (section:ISection) => {
        setDeleteSection(section)
    }

    const onDeleteSection = ( confirm:boolean ) => {
        if( !confirm || !deleteSection ){
            return onCloseDeleteSectionModal()
        }

        sectionDeleteMutation.mutate({ idSection: deleteSection._id! })
    }



    return (
        <>
            <SettingsListSection
                title='Secciones'
                onClickAdd={ ()=> setOpenSectionForm(true) }
                onClickRefresh={ sectionsQuery.refetch }
            >
                { sectionsQuery.isFetching && (
                        <div className={ styles['loader-container'] }>
                            <span className="loader-cube"></span>
                        </div>
                    )
                }
                { sectionsQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar las secciones"
                    />
                    )
                }
                {
                    !sectionsQuery.isFetching && sectionsQuery.data && (
                    <>
                            <SectionTable 
                                sections ={ sectionsQuery.data.sections }
                                currentPage={ sectionsQuery.data.currentPage }
                                onEditSection={ onSetEditSection }
                                onDeleteSection={ onSetDeleteSection }
                            />
                            <div className={ styles['pagination-container'] }>
                                <Pagination
                                    currentPage={ sectionsQuery.data.currentPage }
                                    onPageChange={ handlePageClick }
                                    pageCount={ sectionsQuery.data.totalPages }
                                />
                                <RegisterCount
                                    pageSize={ SECTIONS_PAGE_SIZE }
                                    currentPage={ sectionsQuery.data.currentPage }
                                    currentPageSize={ sectionsQuery.data.pageSize }
                                    totalClientes={ sectionsQuery.data.totalSections }
                                />
                            </div>
                        </>
                    )
                }
            </SettingsListSection>
            <ModalContainer
                show={ openSectionForm || !!sectionEdit }
                onHidden={ onCloseSectionForm }
            >
                <SectionForm
                    section={ sectionEdit }
                    onClose={ onCloseSectionForm }
                    currentPage={ sectionsQuery.data?.currentPage ?? 1 }
                />
            </ModalContainer>
            <ModalContainer
                show={ !!deleteSection }
                onHidden={ onCloseDeleteSectionModal }
            >
                <ModalDelete
                    title="Eliminar sección"
                    subtitle={
                        <p>
                            ¿Desea eliminar la sección <strong>{ deleteSection?.title }</strong>?
                        </p>
                    }
                    onChange={ onDeleteSection }
                    isDeleting={ sectionDeleteMutation.isPending }
                />
            </ModalContainer>
        </>
        
    )
}
