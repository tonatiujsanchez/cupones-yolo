import React, { FC } from 'react'
import { AlertCircleIcon } from '@/components/Icons'

import styles from './ErrorMessage.module.scss'

interface Props {
    message?: string
}
export const ErrorMessage:FC<Props> = ({ message="Hubo un error" }) => {
    return (
        <div className={ styles['error__container'] }>
        <AlertCircleIcon strokeWidth={1} />
        <p className={ styles['error__message'] }>{ message }</p>
    </div>
    )
}
