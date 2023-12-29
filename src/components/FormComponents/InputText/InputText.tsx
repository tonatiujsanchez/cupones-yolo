import { FC, InputHTMLAttributes, LegacyRef, forwardRef  } from 'react'
import { FieldError } from 'react-hook-form'

import styles from './InputText.module.scss'


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label       : string
    fieldName   : string
    placeholder?: string
    error?      : FieldError
    isRequired? : boolean
}

export const InputText:FC<Props> = forwardRef(
    ({ type, label, fieldName, error, isRequired, ...props }, ref) => {
        return (
            <div className={styles['field-container']}>
                <label htmlFor={ fieldName }>{ label }{ isRequired && <span className="required-asterisk">*</span> }</label>
                <input
                    type={ type }
                    id={ fieldName }
                    { ...props }
                    ref={ ref as LegacyRef<HTMLInputElement> }
                    autoComplete="off"
                />
                {
                    error &&
                    <span className={styles['error-message']}>{error.message}</span>
                }
            </div>
        )
    }
)

InputText.displayName = 'InputText'
