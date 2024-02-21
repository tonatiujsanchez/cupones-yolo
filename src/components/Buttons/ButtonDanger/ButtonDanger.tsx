import { FC, ReactNode } from 'react'
import styles from './ButtonDanger.module.scss'

interface Props {
    children : ReactNode
    onClick  : ()=> void
    disabled?: boolean
    outline? : boolean
}
export const ButtonDanger:FC<Props> = ({ children, onClick, disabled, outline }) => {
    return (
        <button
            onClick={ onClick }
            disabled={ disabled }
            className={`${ styles['button'] } ${ outline ? styles['button-outline'] : '' } `}
        >
            { children }
        </button>
    )
}
