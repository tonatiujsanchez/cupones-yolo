import { FC, ReactNode } from 'react'
import { ButtonType } from '@/interfaces'

import styles from './ButtonOutlineLight.module.scss'

interface Props {
    children: ReactNode
    type?   : ButtonType
    onClick : ()=> void
}
export const ButtonOutlineLight:FC<Props> = ({ children, type='button', onClick }) => {
    return (
        <button
            type={ type }
            className={ styles['button'] }
            onClick={ onClick }
        >
            { children }
        </button>
    )
}
