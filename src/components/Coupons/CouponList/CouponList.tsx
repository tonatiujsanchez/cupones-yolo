import { FC } from 'react'
import { CouponListItem, MessageWithoutResults } from '@/components'
import { COUPONS_PAGE_SIZE } from '@/constants'
import { ICoupon } from '@/interfaces'

import styles from './CouponList.module.scss'

interface Props {
    coupons: ICoupon[]
    currentPage: number
}
export const CouponList:FC<Props> = ({ coupons, currentPage }) => {
    return (
        <div className={`custom-scroll ${ styles['table-container'] }`}>
            {   coupons.length === 0
            ?(
                <MessageWithoutResults />
            ):(
                <table className={ styles['table'] }>
                    <thead className={ styles['table__thead'] }>
                        <tr className={ styles['table-row'] }>
                            <th>#</th>
                            <th>Folio</th>
                            <th>Descuento</th>
                            <th>Emitido en</th>
                            <th>Expira en</th>
                            <th>Cliente</th>
                            <th>Canjeado en</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons.map( ( coupon, idx ) => {
                                const index = (COUPONS_PAGE_SIZE * (currentPage - 1)) + (idx + 1);
                                return (
                                    <CouponListItem
                                        key={ coupon._id }
                                        coupon={ coupon }
                                        index={ index }
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}
