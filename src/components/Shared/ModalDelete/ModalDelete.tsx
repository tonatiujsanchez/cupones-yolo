import { FC, ReactNode } from 'react'
import { ButtonDelete, ButtonOutlineLight } from '@/components'
import { TrashIcon } from '@/components/Icons'

import styles from './ModalDelete.module.scss'


interface Props {
    title   : string
    subtitle: ReactNode
    onChange: ( confirm: boolean )=> void
}
export const ModalDelete: FC<Props> = ({ title, subtitle, onChange }) => {
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
                <ButtonOutlineLight
                    onClick={ ()=> onChange(false) }
                >
                    Cancelar
                </ButtonOutlineLight>
                <ButtonDelete
                    title="Remover"
                    onClick={ ()=> onChange(true) }
                />
            </div>
        </div>
    )
}
