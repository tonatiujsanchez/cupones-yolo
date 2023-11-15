import { useState } from 'react'
import { DateSelect } from "react-ymd-date-select/dist/cjs/presets/vanilla";

import { es } from 'date-fns/locale';

import styles from './DatePicker.module.scss'


export const DatePicker = () => {

    const [date, setDate] = useState("")

    console.log(date);
    

    return (
        <div className={ styles['date-picker__container'] }>
            <DateSelect 
                value={date} 
                onChange={setDate}
                monthFormat="MMMM"
                dayFormat="dd"
                defaultYear="now"
                defaultMonth="now"
                defaultDay="now"
                locale={es}
                firstYear={1929}
            />
        </div>
    )
}
