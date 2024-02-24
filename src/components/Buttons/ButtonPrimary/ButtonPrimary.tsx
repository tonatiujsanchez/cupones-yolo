import { FC, CSSProperties, ReactNode } from 'react'
import { ButtonType } from '@/interfaces'

import styles from './ButtonPrimary.module.scss'


interface Props {
    children     : ReactNode
    onClick?     : () => void
    type?        : ButtonType
    disabled?    : boolean
    stylesInline?: CSSProperties
    className?   : string
}
export const ButtonPrimary:FC<Props> = ({ children, onClick, type='button', className='', stylesInline, disabled }) => {
    return (
        <button 
            type={ type }
            className={`${ styles['button'] } ${ className }`}
            style={{
                ...stylesInline
            }}
            onClick={onClick}
            disabled={ disabled }
        >
            { children }
        </button>
    )
}
