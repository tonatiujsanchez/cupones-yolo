import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ButtonDanger, ButtonInfo, MessageWithoutResults, TablePrimary } from '@/components'
import { EditIcon, TrashIcon } from '@/components/Icons'
import { PRODUCTS_PAGE_SIZE } from '@/constants'
import { IProduct } from '@/interfaces'

import styles from './ProductTable.module.scss'


interface Props {
    products       : IProduct[]
    currentPage    : number
    onDeleteProduct: ( product:IProduct )=> void
}
export const ProductTable:FC<Props> = ({ products, currentPage, onDeleteProduct }) => {

    const router = useRouter()

    return (
        products.length === 0
        ?(
            <MessageWithoutResults />
        ):(
            <TablePrimary>
                <TablePrimary.THead>
                    <TablePrimary.TRow>
                        <th>#</th>
                        <th>Foto</th>
                        <th>Nombre</th>
                    </TablePrimary.TRow>
                </TablePrimary.THead>
                <tbody>
                    {
                        products.map(( product, idx ) => {
                            const index = (PRODUCTS_PAGE_SIZE * (currentPage - 1)) + (idx + 1)
                            return (
                                <TablePrimary.TRow key={ product._id } >
                                    <td className={ styles['product-index'] }> { index } </td>
                                    <td>
                                        <figure>
                                            <Image
                                                src={ product.images[0].url }
                                                alt={ product.title }
                                                width={100}
                                                height={100}
                                            />
                                        </figure>
                                    </td>
                                    <td className={ styles['product-title'] }> { product.title } </td>
                                    <td className={ styles['product-actions'] }>
                                        <ButtonInfo
                                            onClick={()=> router.push(`/dashboard/productos/${ product._id }`) }
                                            outline
                                        >
                                            <EditIcon />
                                        </ButtonInfo>
                                        <ButtonDanger
                                            onClick={ ()=> onDeleteProduct( product ) }
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
