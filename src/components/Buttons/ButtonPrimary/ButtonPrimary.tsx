import { FC, CSSProperties, ReactNode } from 'react'
import styles from './ButtonPrimary.module.scss'


interface Props {
    children     : ReactNode
    onClick?     : () => void
    type?        : ButtonType
    disabled?    : boolean
    stylesInline?: CSSProperties
}

type ButtonType = 'button' | 'submit'

export const ButtonPrimary:FC<Props> = ({ children, onClick, type='button', stylesInline }) => {
    return (
        <button 
            type={ type }
            className={ styles.button }
            style={{
                ...stylesInline
            }}
            onClick={onClick}
        >
            { children }
        </button>
    )
}
