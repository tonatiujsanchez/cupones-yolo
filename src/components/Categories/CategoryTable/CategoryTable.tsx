import { FC } from 'react'
import { ButtonDanger, ButtonInfo, MessageWithoutResults, TablePrimary } from '@/components'
import { EditIcon, TrashIcon } from '@/components/Icons'
import { CATEGORIES_PAGE_SIZE } from '@/constants'
import { ICategory } from '@/interfaces'

import styles from './CategoryTable.module.scss'


interface Props {
    categories: ICategory[]
    currentPage: number
    onEditCategory: ( category:ICategory )=> void
}
export const CategoryTable:FC<Props> = ({ categories, currentPage, onEditCategory }) => {
    return (

        categories.length === 0
        ?(
            <MessageWithoutResults />
        ):(
            <TablePrimary>
                <TablePrimary.THead>
                    <TablePrimary.TRow >
                        <th>#</th>
                        <th>Portada</th>
                        <th>Nombre</th>
                        <th>Slug</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </TablePrimary.TRow >
                </TablePrimary.THead>
                <tbody>
                    {
                        categories.map( (category, idx) => {
                            const index = (CATEGORIES_PAGE_SIZE * (currentPage - 1)) + (idx + 1)
                            return (
                                <TablePrimary.TRow key={ category._id } >
                                    <td className={ styles['category-index'] }>{ index }</td>
                                    <td className={ styles['category-cover'] }>
                                        {
                                            category.cover 
                                            ?(
                                                <p>cover</p>
                                            ):(
                                                <span>img</span>
                                            )
                                        }
                                    </td>
                                    <td className={ styles['category-name'] }>{ category.title }</td>
                                    <td>{ category.slug }</td>
                                    <td>{ category.active.toString() }</td>
                                    <td className={ styles['category-actions'] }>
                                        <ButtonInfo
                                            onClick={()=> onEditCategory( category )}
                                            outline
                                        >
                                            <EditIcon />
                                        </ButtonInfo>
                                        <ButtonDanger
                                            onClick={ ()=>{} }
                                            outline
                                        >
                                            <TrashIcon />
                                        </ButtonDanger>
                                    </td>
                                </TablePrimary.TRow>
                            )}
                        )
                    }
                </tbody>
            </TablePrimary>
        )
    )
}

