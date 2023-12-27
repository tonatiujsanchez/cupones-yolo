import { FC } from 'react'
import { FieldError } from 'react-hook-form'
import { DatePicker } from '@/components'

import styles from './DatePickerBox.module.scss'


interface Props {
    label      : string
    fieldName  : string
    value      : Date
    onChange   : ( value:string )=> void
    error?     : FieldError
    className? : string
}
export const DatePickerBox:FC<Props> = ({ label, fieldName, value, onChange, error, className = '' }) => {
    return (
        <div className={ `${ styles['datepicker'] } ${ className }` }>
            <label
                className={ styles['datepicker__label'] }
                htmlFor={ fieldName }
            >
                { label }
            </label>
            <DatePicker
                value={value}
                onChange={ onChange }
            />
            {
                error &&
                <span className={styles['datepicker__error-message']}>{error.message}</span>
            }
        </div>
    )
}
