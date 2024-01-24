import { FC } from 'react'
import { ButtonPrimary } from '@/components'
import { ExclamationTriangleIcon } from '@/components/Icons'
import styles from './WarningModal.module.scss'

interface Props {
    title   : string
    subtitle: string
    onChange: ()=> void
}
export const WarningModal:FC<Props> = ({ title, subtitle, onChange }) => {
    return (
        <div className={ styles['modal']} >
            <div className={ styles['modal__content'] }>
                <div className={ styles['modal__icon'] }>
                    <ExclamationTriangleIcon />
                </div>
                <div className={ styles['modal__text'] }>
                    <h3 className={ styles['modal__title'] }>{ title }</h3>
                    <div className={ styles['modal__subtitle'] }>
                        { subtitle }
                    </div>
                </div>
            </div>
            <div className={ styles['modal__actions'] }>
                <ButtonPrimary
                    onClick={ onChange }
                >
                    Aceptar
                </ButtonPrimary>
            </div>
        </div>
    )
}
