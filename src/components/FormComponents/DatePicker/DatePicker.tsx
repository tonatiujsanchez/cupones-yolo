import { useRef, useEffect, FC } from 'react'
import { DateSelect } from "react-ymd-date-select/dist/cjs/presets/vanilla"

import { es } from 'date-fns/locale'

import styles from './DatePicker.module.scss'

interface Props {
    value   : Date
    onChange: ( value: string )=>void
}

export const DatePicker:FC<Props> = ({ value, onChange }) => {

    const dateSelectRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        
        const firstOptionselectYear  = dateSelectRef.current?.querySelectorAll('select')[0].firstElementChild as HTMLOptionElement
        const firstOptionselectMonth = dateSelectRef.current?.querySelectorAll('select')[1].firstElementChild as HTMLOptionElement
        const firstOptionselectDay   = dateSelectRef.current?.querySelectorAll('select')[2].firstElementChild as HTMLOptionElement
        
        firstOptionselectYear.innerText  = 'Año'
        firstOptionselectMonth.innerText = 'Mes'
        firstOptionselectDay.innerText   = 'Día'
    }, [])
    

    return (
        <div ref={ dateSelectRef } className={ styles['date-picker__container'] }>
            <DateSelect 
                value={ value ? value.toString() : "" } 
                onChange={ onChange }
                monthFormat="MMMM"
                dayFormat="dd"
                locale={ es }
                firstYear={ 1929 }
            />
        </div>
    )
}
