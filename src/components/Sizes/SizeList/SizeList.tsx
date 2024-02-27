import { useState } from 'react'
import { useDeleteSize, useGetSizes } from '@/hooks'
import { ErrorMessage, ModalContainer, ModalDelete, Pagination, RegisterCount, SettingsListSection, SizeForm, SizeTable } from '@/components'
import { SIZES_PAGE_SIZE } from '@/constants'
import { ISize } from '@/interfaces'

import styles from './SizeList.module.scss'


export const SizeList = () => {

    const [openSizeForm, setOpenSizeForm] = useState<boolean>(false)
    const [sizeEdit, setSizeEdit] = useState<ISize>()
    const [deleteSize, setDeleteSize] = useState<ISize>()

    const { sizesQuery, handlePageClick } = useGetSizes({ page: 1 })

    const { sizeDeleteMutation } = useDeleteSize({
        currentPage: sizesQuery.data?.currentPage ?? 1,
        onClose: () => setDeleteSize(undefined)
    })


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

    const onCloseDeleteSizeModal = () => {
        setDeleteSize(undefined)
    }

    const onDeleteSize = ( confirm: boolean ) => {
        if( !confirm || !deleteSize ){
            return onCloseDeleteSizeModal()
        }

        sizeDeleteMutation.mutate({ idSize: deleteSize._id! })

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
            <ModalContainer
                show={ !!deleteSize }
                onHidden={ onCloseDeleteSizeModal }
            >
                <ModalDelete
                    title="Eliminar talla"
                    subtitle={
                        <p>
                            ¿Desea eliminar la talla <strong>{ deleteSize?.label }</strong>?
                        </p>
                    }
                    onChange={ onDeleteSize }
                    isDeleting={ sizeDeleteMutation.isPending }
                />
            </ModalContainer>
        </>
    )
}
