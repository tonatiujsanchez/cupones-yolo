import { ChangeEventHandler, FC } from 'react'
import { FieldError } from 'react-hook-form'

import styles from './ReloadableInput.module.scss'
import { ButtonRefresh } from '@/components'


interface Props {
    value      : string
    onChange   : ChangeEventHandler<HTMLInputElement>
    reload     : ()=> void
    fieldName  : string
    label      : string
    isRequired?: boolean
    error?     : FieldError
    placeholder?: string
    disabled?   : boolean
}
export const ReloadableInput:FC<Props> = ({ value, onChange, reload, fieldName, label, isRequired, error, placeholder, disabled }) => {
    
    return (
        <div className={styles['field-container']}>
            <div className={ styles['field-label-container'] }>
                <label 
                    htmlFor={ fieldName }
                >
                    { label }{ isRequired && <span className="required-asterisk">*</span> }
                </label>
                <ButtonRefresh
                    onClick={ reload }
                />
            </div>
            <input
                type="text"
                value={ value }
                onChange={ onChange }
                id={ fieldName }
                autoComplete="off"
                placeholder={ placeholder }
                disabled={ disabled }
            />
            {
                error &&
                <span className={styles['error-message']}>{error.message}</span>
            }
        </div>
    )
}
