import { FC } from 'react'
import { CheckIcon } from '@/components/Icons'
import { GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR } from '@/constants'

import styles from './Checkbox.module.scss'


interface Props {
    checked    : boolean
    onChange   : ( value:boolean ) => void
    text       : string
    borderColor?: string
}

export const Checkbox:FC<Props> = ({ checked, onChange, text, borderColor = GRAY_COLOR }) => {
    return (
        <label
            htmlFor="checkbox-form"
            className={ styles['checkbox-label'] }
        >
            <input
                type="checkbox"
                id="checkbox-form"
                checked={checked}
                onChange={() => onChange(!checked)}
                style={{ display: 'none' }}
            />
            <div 
                className={ styles['custom-check']}
                style={{
                    background: checked ? PRIMARY_COLOR : WHITE_COLOR,
                    border: checked ? 'none' : `0.1rem solid ${ borderColor }`
                }}
            >
                { checked && <CheckIcon fill={ WHITE_COLOR } stroke={ 'none' } />}
            </div>
            <span>{ text }</span>
        </label>
    )
}
