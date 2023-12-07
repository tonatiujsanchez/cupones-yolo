import { FC, useCallback } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import { CheckIcon } from '@/components/Icons'
import { dateFormatDayAndMonth } from '@/utils'
import { toastBasic } from '@/libs'

import { IClient, ICoupon } from '@/interfaces'
import styles from './RegisterListItem.module.scss'

interface Props {
    client: IClient
    index : number
    onToggleCouponsSent: ( client: IClient ) => void
}
export const RegisterListItem: FC<Props> = ({ client, index, onToggleCouponsSent }) => {

    const onCopy = useCallback(( couponFolio:string, value:number ) => {
        toastBasic(
            `${couponFolio}`,
            `Copón ${ value }% de ${ client.name.split(' ')[0] } copiado`
        )
    }, [client.name])

    return (
        <tr className={ styles['table-row'] }>
            <td className={ styles['client-index'] }>{ index }</td>
            <td className={ styles['client-name'] }>{ client.name }</td>
            <td>{ client.phone }</td>
            <td>{ dateFormatDayAndMonth(client.birthdate) }</td>
            <td className={ styles['coupons-cell'] }>
                {
                    client.coupons.map( coupon => (
                        <CopyToClipboard 
                            key={ (coupon as ICoupon)._id } 
                            onCopy={ ()=> onCopy( (coupon as ICoupon).folio, (coupon as ICoupon).value ) } 
                            text={ (coupon as ICoupon).folio }
                        >
                            <button className={ styles['coupon'] }>
                                <span>{ (coupon as ICoupon).value }%</span>
                                <span>{ (coupon as ICoupon).folio }</span>
                            </button>
                        </CopyToClipboard>
                    ))
                }
            </td>
            <td className={ styles['coupons-sent'] }>
                {
                    client.couponsSent
                        ? (
                            <button
                                onClick={ ()=> onToggleCouponsSent( client ) } 
                                className={`${ styles['coupons-sent__button'] } ${ styles['coupons-sent__check'] }`}
                            >
                                <CheckIcon stroke={'none'} /> Enviados
                            </button>
                        ):(
                            <button
                                onClick={ ()=> onToggleCouponsSent( client ) } 
                                className={ styles['coupons-sent__button'] }
                            >
                                <CheckIcon /> Pendientes
                            </button>
                        )
                }
            </td>
        </tr>
    )
}
