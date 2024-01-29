import { FC, ReactNode } from 'react'
import { ButtonType } from '@/interfaces'

import styles from './ButtonLight.module.scss'

interface Props {
    children  : ReactNode
    onClick   : ()=> void
    type?     : ButtonType
    disabled? : boolean
}
export const ButtonLight:FC<Props> = ({ children, onClick, type='button', disabled=false }) => {
    return (
        <button
            type={ type }
            className={ styles['button'] }
            onClick={ onClick }
            disabled={ disabled }
        >
            { children }
        </button>
    )
}
