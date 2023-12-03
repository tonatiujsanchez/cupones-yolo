import { FC } from 'react'

import { IClient } from '@/interfaces'
import styles from './RegisterList.module.scss'

interface Props {
    clients: IClient[]
}
export const RegisterList:FC<Props> = ({ clients }) => {

    console.log(clients)

    return (
        <div>
            {
                clients.map( client => (
                    <p key={ client._id }>{ client.name }</p>
                ))
            }
        </div>
    )
}
