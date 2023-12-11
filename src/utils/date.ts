import { ISelectOption } from '@/interfaces'


export  const getYears = ( size = 10, yearCurrent = new Date().getFullYear() ):ISelectOption[] => {
    
    const years:ISelectOption[] = []

    for (let i = size; i >= 1; i--) {
        years.push({
            value: yearCurrent.toString(),
            label: yearCurrent.toString(),
        })
        yearCurrent--
    }

    return years
}



