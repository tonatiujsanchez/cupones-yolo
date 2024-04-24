import { FC } from 'react'
import { ButtonDanger, ButtonInfo, MessageWithoutResults, TablePrimary } from '@/components'
import { EditIcon, TrashIcon } from '@/components/Icons'
import { BRANDS_PAGE_SIZE } from '@/constants'
import { IBrand } from '@/interfaces'
import styles from './BrandTable.module.scss'

interface Props {
    brands: IBrand[]
    currentPage: number
    onEditBrand: ( brand:IBrand )=> void
    onDeleteBrand: ( brand:IBrand )=> void
}
export const BrandTable:FC<Props> = ({ brands, currentPage, onEditBrand, onDeleteBrand }) => {
    return (
        brands.length === 0
        ?(
            <MessageWithoutResults />
        ):(
            <TablePrimary>
                <TablePrimary.THead>
                    <TablePrimary.TRow>
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Slug</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </TablePrimary.TRow>
                </TablePrimary.THead>
                <tbody>
                    {
                        brands.map( (brand, idx) => {
                            const index = (BRANDS_PAGE_SIZE * (currentPage - 1)) + (idx + 1)

                            return (
                                <TablePrimary.TRow key={brand._id}>
                                    <td className={ styles['brand-index'] }>{ index }</td>
                                    <td className={ styles['brand-cover'] }>
                                        {
                                            brand.image 
                                            ?(
                                                <p>cover</p>
                                            ):(
                                                <span>img</span>
                                            )
                                        }
                                    </td>
                                    <td className={ styles['brand-name'] }>{ brand.title }</td>
                                    <td>{ brand.slug }</td>
                                    <td>{ brand.active.toString() }</td>
                                    <td className={ styles['brand-actions'] }>
                                        <ButtonInfo
                                            onClick={()=> onEditBrand( brand )}
                                            outline
                                        >
                                            <EditIcon />
                                        </ButtonInfo>
                                        <ButtonDanger
                                            onClick={ ()=> onDeleteBrand( brand ) }
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
