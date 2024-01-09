import { FC } from 'react'
import { XIcon } from '@/components/Icons'
import styles from './ModalFormHeader.module.scss'

interface Props {
    title  : string
    onClose: ()=> void
}
export const ModalFormHeader:FC<Props> = ({ title, onClose }) => {
    return (
        <header className={ styles['header'] }>
            <h3 className={ styles['header__title'] }>{ title }</h3>
            <button
                onClick={ onClose }
                className={ styles['header__close-button'] }
            >
                <XIcon />
            </button>
        </header>
    )
}
