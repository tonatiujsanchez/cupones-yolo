import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ButtonDanger, ButtonInfo, MessageWithoutResults, TablePrimary } from '@/components'
import { EditIcon, TrashIcon } from '@/components/Icons'
import { currencyFormatMXN, getPriceWithDiscount } from '@/utils'
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
                        <th>Categoría</th>
                        <th>Inventario</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </TablePrimary.TRow>
                </TablePrimary.THead>
                <tbody>
                    {
                        products.map(( product, idx ) => {
                            const index = (PRODUCTS_PAGE_SIZE * (currentPage - 1)) + (idx + 1)
                            console.log(product)
                            return (
                                <TablePrimary.TRow key={ product._id } >
                                    <td className={ styles['product-index'] }> { index } </td>
                                    <td className={ styles['product-image'] }>
                                        <figure className={ styles['product-image__figure'] }>
                                            <Image
                                                src={ product.images[0].url }
                                                alt={ product.title }
                                                title={ product.title }
                                                width={100}
                                                height={100}
                                                className={ styles['product-image__img'] }
                                            />
                                        </figure>
                                    </td>
                                    <td className={ styles['product-title'] }> { product.title } </td>
                                    <td className={ styles['product-category'] }> {
                                        product.category.map( cat => (
                                            <span key={ cat._id }>{ cat.title }</span>
                                        ))
                                    } </td>
                                    <td className={ styles['product-inStock'] }> { product.inStock } </td>
                                    <td className={ styles['product-price'] }>
                                        { 
                                            product.discountRate
                                            ?(
                                                <div className={ styles['product-price__content'] }>
                                                    <span className={ styles['product-price__original-price'] }>{ currencyFormatMXN( product.price ) }</span>
                                                    <span className={ styles['product-price__discount-price'] }>{ currencyFormatMXN( getPriceWithDiscount( product.price, product.discountRate ) ) }</span>
                                                </div>
                                            ):(
                                                <span>{ currencyFormatMXN( product.price )  }</span>
                                            )
                                        } 
                                    </td>
                                    <td className={ styles['product-discount'] }> { product.discountRate }% </td>
                                    <td className={ styles['product-status'] }> 
                                    {
                                        product.active 
                                            ? <span className={styles['product-status__published']}>publicado</span> 
                                            : <span className={styles['product-status__unpublished']}>borrador</span>
                                    } 
                                    </td>
                                    <td className={ styles['product-actions'] }>
                                        <div className={ styles['product-actions__content'] }>                  
                                            <ButtonDanger
                                                onClick={ ()=> onDeleteProduct( product ) }
                                                outline
                                            >
                                                <TrashIcon />
                                            </ButtonDanger>
                                            <ButtonInfo
                                                onClick={()=> router.push(`/dashboard/productos/${ product._id }`) }
                                                outline
                                            >
                                                <EditIcon />
                                            </ButtonInfo>
                                        </div>
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
