import { FC } from 'react'
import styles from './ModalDelete.module.scss'
import { ButtonDelete } from '@/components'
import { TrashIcon } from '@/components/Icons'

interface Props {
    title   : string
    subtitle: string
}
export const ModalDelete: FC<Props> = ({ title, subtitle }) => {
    return (
        <div className={ styles['modal'] }>
            <div className={ styles['modal__content'] }>
                <div className={ styles['modal__icon'] }>
                    <TrashIcon />
                </div>
                <div className={ styles['modal__text'] }>
                    <h3 className={ styles['modal__title'] }>{ title }</h3>
                    <div className={ styles['modal__subtitle'] }>
                        { subtitle }
                    </div>
                </div>
            </div>
            <div className={ styles['modal__actions'] }>
                <button
                    type="button"
                >
                    Cancelar
                </button>
                <ButtonDelete
                    onClick={ ()=>{} }
                />
            </div>
        </div>
    )
}
