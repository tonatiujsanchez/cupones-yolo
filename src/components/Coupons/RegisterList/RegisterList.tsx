import { FC } from 'react'

import { IClientsResp } from '@/interfaces'
import styles from './RegisterList.module.scss'

interface Props {
    clients: IClientsResp
}
export const RegisterList:FC<Props> = ({ clients }) => {

    console.log(clients)

    return (
        <div>
            {
                clients.clients.map( client => (
                    <p key={ client._id }>{ client.name }</p>
                ))
            }
        </div>
    )
}
