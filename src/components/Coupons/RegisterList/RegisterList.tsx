import { FC } from 'react'

import { RegisterListItem } from '@/components'
import { CLIENTS_PAGE_SIZE } from '@/constants'

import { IClient, ICouponsSentOptions } from '@/interfaces'
import styles from './RegisterList.module.scss'
import { useUpdateClient } from '@/hooks'


interface Props {
    clients    : IClient[]
    currentPage: number,
    searchTerm : string
    couponsSent: ICouponsSentOptions
    month      : string
    year       : string
}
export const RegisterList:FC<Props> = ({ clients, currentPage, searchTerm, couponsSent, month, year }) => {

    const { updateClient } = useUpdateClient()

    const onToggleCouponsSent = ( client: IClient ) => {
        updateClient.mutate({ 
            client: {
                ...client,
                couponsSent: !client.couponsSent
            }, 
            currentPage,
            searchTerm,
            couponsSent,
            month,
            year
        })
    }

    return (
        <div className={`custom-scroll ${ styles['table-container'] }`}>
            <table className={ styles['table'] }>
                <thead className={ styles['table__thead'] }>
                    <tr className={ styles['table-row'] }>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Nacimiento</th>
                        <th>Cupones</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody className={ styles['table__body'] }>
                    {
                        clients.map((client, idx) => {
                            const index = (CLIENTS_PAGE_SIZE * (currentPage - 1)) + (idx + 1);
                            return (
                                <RegisterListItem 
                                    key={ client._id } 
                                    client={ client } 
                                    index={ index }
                                    onToggleCouponsSent = { onToggleCouponsSent }
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
