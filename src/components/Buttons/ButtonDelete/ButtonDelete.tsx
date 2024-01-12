import { FC } from 'react'
import { ButtonType } from '@/interfaces'

import styles from './ButtonDelete.module.scss'

interface Props {
    title? : string
    type?  : ButtonType
    onClick: ()=> void
}
export const ButtonDelete:FC<Props> = ({ title='Eliminar', type='button', onClick }) => {
    return (
        <button
            type={ type }
            className={ styles['button'] }
            onClick={ onClick }
        >
            { title }
        </button>
    )
}
