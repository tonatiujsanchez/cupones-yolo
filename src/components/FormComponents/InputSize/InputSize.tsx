import { FC } from 'react'
import { ISize } from '@/interfaces'
import styles from './InputSize.module.scss'

interface Props {
    size: ISize
    value: number
    onChange: ( value:number )=>void
}
export const InputSize:FC<Props> = ({ size, value, onChange }) => {
    return (
        <div className={ styles['input-size'] }>
            <label 
                htmlFor={`input-size-${size._id}`}
                className={ styles['input-size__label'] }
            >
                { size.label }
            </label>
            <input
                type="number"
                id={`input-size-${size._id}`}
                min={0}
                value={ value }
                onChange={({ target }) => onChange( Number(target.value) ) }
                className={ styles['input-size__input'] }
            />
        </div>
    )
}
