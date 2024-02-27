import { FC, useState } from 'react'
import { useGetSizes } from '@/hooks'
import { ErrorMessage, ModalContainer, Pagination, RegisterCount, SettingsListSection, SizeForm, SizeTable } from '@/components'
import { ISize } from '@/interfaces'

import styles from './SizeList.module.scss'
import { SIZES_PAGE_SIZE } from '@/constants'


export const SizeList:FC = () => {


    const [openSizeForm, setOpenSizeForm] = useState<boolean>(false)
    const [sizeEdit, setSizeEdit] = useState<ISize>()
    const [deleteSize, setDeleteSize] = useState<ISize>()


    const { sizesQuery, handlePageClick } = useGetSizes({ page: 1 })


    const onCloseSizeForm = () => {
        setOpenSizeForm(false)
        setSizeEdit(undefined)
    }

    const onSetEditSize = (size:ISize) => {
        setSizeEdit(size)
    }

    const onSetDeleteSize = (size:ISize) => {
        setDeleteSize(size)
    }


    return (
        <>
            <SettingsListSection
                title='Tallas'
                onClickAdd={ ()=> setOpenSizeForm(true) }
                onClickRefresh={ sizesQuery.refetch }
            >
                { sizesQuery.isFetching && (
                        <div className={ styles['loader-container'] }>
                            <span className="loader-cube"></span>
                        </div>
                    )
                }
                { sizesQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar las tallas"
                    />
                    )
                }
                {
                    !sizesQuery.isFetching && sizesQuery.data && (
                    <>
                            <SizeTable 
                                sizes ={ sizesQuery.data.sizes }
                                currentPage={ sizesQuery.data.currentPage }
                                onEditSize={ onSetEditSize }
                                onDeleteSize={ onSetDeleteSize }
                            />
                            <div className={ styles['pagination-container'] }>
                                <Pagination
                                    currentPage={ sizesQuery.data.currentPage }
                                    onPageChange={ handlePageClick }
                                    pageCount={ sizesQuery.data.totalPages }
                                />
                                <RegisterCount
                                    pageSize={ SIZES_PAGE_SIZE }
                                    currentPage={ sizesQuery.data.currentPage }
                                    currentPageSize={ sizesQuery.data.pageSize }
                                    totalClientes={ sizesQuery.data.totalSizes }
                                />
                            </div>
                        </>
                    )
                }
            </SettingsListSection>
            <ModalContainer
                show={ openSizeForm || !!sizeEdit }
                onHidden={ onCloseSizeForm }
            >
                <SizeForm
                    size={ sizeEdit }
                    onClose={ onCloseSizeForm }
                    currentPage={ sizesQuery.data?.currentPage ?? 1 }
                />
            </ModalContainer>
        </>
    )
}
