import { FC } from 'react'
import { ButtonDanger, ButtonInfo, MessageWithoutResults, TablePrimary } from '@/components'
import { EditIcon, TrashIcon } from '@/components/Icons'
import { SIZES_PAGE_SIZE } from '@/constants'
import { ISize } from '@/interfaces'

import styles from './SizeTable.module.scss'

interface Props {
    sizes       : ISize[]
    currentPage : number
    onEditSize  : ( size: ISize )=> void
    onDeleteSize: ( size: ISize )=> void
}
export const SizeTable:FC<Props> = ({ sizes, currentPage, onEditSize, onDeleteSize }) => {
    
    const getIndex = (idx:number) => {
        return (SIZES_PAGE_SIZE * (currentPage - 1)) + (idx + 1)
    }
    
    return (
        sizes.length === 0
        ?(
            <MessageWithoutResults />
        ):(
            <TablePrimary>
                <TablePrimary.THead>
                    <TablePrimary.TRow>
                        <th>#</th>
                        <th>Talla</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </TablePrimary.TRow>
                </TablePrimary.THead>
                <tbody>
                {
                    sizes.map( (size, idx) => {
                        return (
                            <TablePrimary.TRow key={ size._id } >
                                <td className={ styles['size-index'] }>{ getIndex( idx ) }</td>
                                <td className={ styles['size-name'] }>{ size.label }</td>
                                <td>{ size.active.toString() }</td>
                                <td className={ styles['size-actions'] }>
                                    <ButtonInfo
                                        onClick={()=> onEditSize( size )}
                                        outline
                                    >
                                        <EditIcon />
                                    </ButtonInfo>
                                    <ButtonDanger
                                        onClick={ ()=> onDeleteSize( size ) }
                                        outline
                                    >
                                        <TrashIcon />
                                    </ButtonDanger>
                                </td>
                            </TablePrimary.TRow>
                        )
                    })
                }
                </tbody>
            </TablePrimary>
        )
    )
}
