import { FC } from 'react'
import { dateFormat } from '@/utils'
import { IClient, ICoupon } from '@/interfaces'

import styles from './CouponListItem.module.scss'

interface Props {
    coupon: ICoupon
    index : number
}
export const CouponListItem:FC<Props> = ({ coupon, index }) => {
    return (
        <tr className={ styles['table-row'] }>
            <td className={ styles['coupon-index'] }>{ index }</td>
            <td className={ styles['coupon-folio'] }>{ coupon.folio }</td>
            <td className={ styles['coupon-value'] }>-{ coupon.value }%</td>
            <td className={ styles['coupon-date'] }>{ dateFormat( coupon.issuedAt ) }</td>
            <td className={ styles['coupon-date'] }>{ dateFormat( coupon.expiredAt ) }</td>
            <td className={ styles['coupon-client__name'] }>{ (coupon.client as IClient).name.toLowerCase() }</td>
            <td>
                {
                    coupon.exchangedAt
                    ? (
                        <span>{ dateFormat( coupon.exchangedAt ) }</span>
                    ):(
                        <span>Sin canjear</span>
                    )
                }
            </td>
        </tr>
    )
}
