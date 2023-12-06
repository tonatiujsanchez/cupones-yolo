import { FC } from 'react'

import { CheckIcon } from '@/components/Icons'
import { dateFormatDayAndMonth } from '@/utils'

import { IClient, ICoupon } from '@/interfaces'
import styles from './RegisterListItem.module.scss'

interface Props {
    client: IClient
    index : number
}
export const RegisterListItem: FC<Props> = ({ client, index }) => {
    return (
        <tr className={ styles['table-row'] }>
            <td className={ styles['client-index'] }>{ index }</td>
            <td className={ styles['client-name'] }>{ client.name }</td>
            <td>{ client.phone }</td>
            <td>{ dateFormatDayAndMonth(client.birthdate) }</td>
            <td className={ styles['coupons-cell'] }>
                {
                    client.coupons.map( coupon => (
                        <button key={ (coupon as ICoupon)._id } className={ styles['coupon'] }>
                            <span>{ (coupon as ICoupon).value }%</span>
                            <span>{ (coupon as ICoupon).folio }</span>
                        </button>
                    ))
                }
            </td>
            <td className={ styles['coupons-sent'] }>
                {
                    client.couponsSent
                        ? (
                            <button className={`${ styles['coupons-sent__button'] } ${ styles['coupons-sent__check'] }`}>
                                <CheckIcon stroke={'none'} /> Enviados
                            </button>
                        ):(
                            <button className={ styles['coupons-sent__button'] }>
                                <CheckIcon /> Pendientes
                            </button>
                        )
                }
            </td>
        </tr>
    )
}
