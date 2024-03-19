import { FC } from 'react'
import { ButtonLight } from '../ButtonLight'

import styles from './ButtonSelectFiles.module.scss'

interface Props {
    onClick    : ()=> void
    lengthFiles: number
    disabled?  : boolean
}
export const ButtonSelectFiles:FC<Props> = ({ onClick, lengthFiles, disabled }) => {
    return (
        <div className={ styles['button-container'] }>
            <ButtonLight
                onClick={ onClick }
                disabled={ disabled }
            >
                Elegir archivos
            </ButtonLight>
            {
                lengthFiles === 0 ? (
                    <span>Ningún archivo selec.</span>
                ):(
                    <span>{ lengthFiles } { lengthFiles > 1 ? 'archivos':'archivo' }</span>
                )
            }
        </div>
    )
}
