import { FC } from 'react'
import styles from './ButtonDelete.module.scss'

interface Props {
    title? : string
    onClick: ()=> void
}
export const ButtonDelete:FC<Props> = ({ title='Eliminar', onClick }) => {
    return (
        <button
            type="button"
            className={ styles['button'] }
            onClick={ onClick }
        >
            { title }
        </button>
    )
}
