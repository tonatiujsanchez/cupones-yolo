import { FC } from 'react'
import { ArchiveBoxArrowDownIcon } from '@/components/Icons'

import styles from './MessageWithoutResults.module.scss'


interface Props {
    message?: string
}
export const MessageWithoutResults:FC<Props> = ({ message='Sin resultados' }) => {
    return (
        <div className={ styles['without-results__container'] }>
            <ArchiveBoxArrowDownIcon strokeWidth={1} />
            <p className={ styles['without-results__message'] }>{ message }</p>
        </div>
    )
}
