import { FC } from 'react'
import { ButtonDanger, ButtonInfo, MessageWithoutResults, TablePrimary } from '@/components'
import { ISection } from '@/interfaces'

import styles from './SectionTable.module.scss'
import { SECTIONS_PAGE_SIZE } from '@/constants'
import { EditIcon, TrashIcon } from '@/components/Icons'


interface Props {
    sections       : ISection[]
    currentPage    : number
    onEditSection  : ( section:ISection )=> void
    onDeleteSection: ( section:ISection )=> void
}
export const SectionTable:FC<Props> = ({ sections, currentPage, onEditSection, onDeleteSection }) => {
    return (
        sections.length === 0
        ?(
            <MessageWithoutResults />
        ):(
            <TablePrimary>
                <TablePrimary.THead>
                    <TablePrimary.TRow>
                        <th>#</th>
                        <th>Portada</th>
                        <th>Nombre</th>
                        <th>Slug</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </TablePrimary.TRow>
                </TablePrimary.THead>
                <tbody>
                    {
                        sections.map( (section, idx) => {
                            const index = (SECTIONS_PAGE_SIZE * (currentPage - 1)) + (idx + 1)
                            
                            return (
                                <TablePrimary.TRow key={ section._id } >
                                    <td className={ styles['section-index'] }>{ index }</td>
                                    <td className={ styles['section-cover'] }>
                                        {
                                            section.cover 
                                            ?(
                                                <p>cover</p>
                                            ):(
                                                <span>img</span>
                                            )
                                        }
                                    </td>
                                    <td className={ styles['section-name'] }>{ section.title }</td>
                                    <td>{ section.slug }</td>
                                    <td>{ section.active.toString() }</td>
                                    <td className={ styles['section-actions'] }>
                                        <ButtonInfo
                                            onClick={()=> onEditSection( section )}
                                            outline
                                        >
                                            <EditIcon />
                                        </ButtonInfo>
                                        <ButtonDanger
                                            onClick={ ()=> onDeleteSection( section ) }
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
