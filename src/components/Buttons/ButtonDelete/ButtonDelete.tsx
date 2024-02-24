import { FC } from 'react'
import { ButtonType } from '@/interfaces'

import styles from './ButtonDelete.module.scss'

interface Props {
    onClick    : ()=> void
    title?     : string
    type?      : ButtonType
    isDeleting?: boolean
}
export const ButtonDelete:FC<Props> = ({ onClick, title='Eliminar', type='button', isDeleting=false }) => {
    return (
        <button
            type={ type }
            className={ styles['button'] }
            onClick={ onClick }
            disabled={ isDeleting }
        >
            { 
                isDeleting
                ?( <div className="custom-loader-white"></div> )
                :( title )
            }
        </button>
    )
}
