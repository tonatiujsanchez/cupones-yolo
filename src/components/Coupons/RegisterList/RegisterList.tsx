import { FC } from 'react'

import { dateFormatDayAndMonth } from '@/utils'
import { CLIENTS_PAGE_SIZE } from '@/constants'
import { IClient, ICoupon } from '@/interfaces'

import styles from './RegisterList.module.scss'

interface Props {
    clients    : IClient[]
    currentPage: number
}
export const RegisterList:FC<Props> = ({ clients, currentPage }) => {
    return (
        <div className={`custom-scroll ${ styles['table-container'] }`}>
            <table className={ styles['table'] }>
                <thead className={ styles['table__thead'] }>
                    <tr className={ styles['table-row'] }>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Fecha de nacimiento</th>
                        <th>Cupones</th>
                    </tr>
                </thead>
                <tbody className={ styles['table__body'] }>
                    {
                        clients.map((client, idx) => {
                            const index = (CLIENTS_PAGE_SIZE * (currentPage - 1)) + (idx + 1);
                            return (
                                <tr key={ client._id } className={ styles['table-row'] }>
                                    <td className={ styles['client-index'] }>{ index }</td>
                                    <td className={ styles['client-name'] }>{ client.name }</td>
                                    <td>{ client.phone }</td>
                                    <td>{ dateFormatDayAndMonth( client.birthdate ) }</td>
                                    <td className={ styles['coupons-cell'] }>
                                        {
                                            client.coupons.map( coupon => (
                                                    <button key={ (coupon as ICoupon)._id } className={ styles['coupon'] }>
                                                        <span>{ (coupon as ICoupon).value }%</span>
                                                        <span>{ (coupon as ICoupon).folio }</span>
                                                    </button>
                                                )
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
