import { FC } from 'react'

import { IClient } from '@/interfaces'
import styles from './RegisterList.module.scss'
import { dateFormatDayAndMonth } from '@/utils'

interface Props {
    clients: IClient[]
}
export const RegisterList:FC<Props> = ({ clients }) => {

    console.log(clients)

    return (
        <table className={ styles['table'] }>
            <thead className={ styles['table__thead'] }>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Celular</th>
                    <th>Fecha de nacimiento</th>
                    <th>Cupones</th>
                </tr>
            </thead>
            <tbody className={ styles['table__body'] }>
                {
                    clients.map((client, idx) => (
                        <tr key={ client._id }>
                            <td>{ idx + 1 }</td>
                            <td className={ styles['client-name'] }>{ client.name }</td>
                            <td>{ client.phone }</td>
                            <td>{ dateFormatDayAndMonth( client.birthdate ) }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
