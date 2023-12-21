import { FC } from 'react'
import { dateFormat } from '@/utils'
import { IClient, ICoupon } from '@/interfaces'

import styles from './CouponListItem.module.scss'
import { isAfter } from 'date-fns'


interface Props {
    coupon: ICoupon
    index : number
}
export const CouponListItem:FC<Props> = ({ coupon, index }) => {

    const expired = isAfter(
        new Date(),
        new Date(coupon.expiredAt), 
    )

    return (
        <tr className={ styles['table-row'] }>
            <td className={ styles['coupon-index'] }>{ index }</td>
            <td className={ styles['coupon-folio'] }>{ coupon.folio }</td>
            <td className={ styles['coupon-value'] }><span>-{ coupon.value }%</span></td>
            <td className={ `${ styles['coupon-date'] } ${ expired ? styles['expired-at__issued-at'] : '' }` }>{ dateFormat( coupon.issuedAt ) }</td>
            <td className={ `${ styles['coupon-date'] } ${ expired ? styles['expired-at'] : '' }` }>
                { dateFormat( coupon.expiredAt ) }
            </td>
            <td className={ styles['coupon-client__name'] }>
                { (coupon.client as IClient).name.toLowerCase() }
            </td>
            <td className={ styles['exchanged-at'] }>
                {
                    !coupon.exchangedAt && expired 
                    ? (
                        <span className={ styles['exchanged-at__msg-expired'] }>Expirado</span>
                    ):(
                        coupon.exchangedAt
                        ? (
                            <span>{ dateFormat( coupon.exchangedAt ) }</span>
                        ):(
                            <button>Canjear</button>
                        )
                    )
                }
            </td>
        </tr>
    )
}
