import { useState } from 'react'
import { useGetSections } from '@/hooks'
import { ErrorMessage, ModalContainer, Pagination, RegisterCount, SectionForm, SectionTable, SettingsListSection } from '@/components'
import { ISection } from '@/interfaces'

import styles from './SectionList.module.scss'
import { SECTIONS_PAGE_SIZE } from '@/constants'

export const SectionList = () => {

    const [openSectionForm, setOpenSectionForm] = useState<boolean>(false)
    const [sectionEdit, setSectionEdit] = useState<ISection>()
    const [deleteSection, setDeleteSection] = useState<ISection>()

    const { sectionsQuery, handlePageClick } = useGetSections({ page: 1 })


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
        </>
        
    )
}
