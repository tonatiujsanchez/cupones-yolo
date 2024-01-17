
export const dateFormat = ( date:Date|string ):string => {
    
    const longDate = new Date(date)
        .toLocaleDateString('es-ES',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'UTC' // Establece la zona horaria a UTC
        })
    
    return longDate.substring(0,1).toUpperCase() + longDate.substring(1)
}

export const dateFormatLong = ( date:Date ):string => {
    
    const longDate = new Date(date)
        .toLocaleDateString('es-ES',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // Establece la zona horaria a UTC
        })
    
    return longDate.substring(0,1).toUpperCase() + longDate.substring(1)
}


export const dateFormatDayAndMonth = ( date:Date ):string => {
    
    const longDate = new Date(date)
        .toLocaleDateString('es-ES',{
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        })
    
    return longDate.substring(0,1).toUpperCase() + longDate.substring(1)
}


export const getDay = (date: Date|string ) => {
    const day = new Date(date)
        .toLocaleDateString('es-ES', {
            day: 'numeric',
            timeZone: 'UTC'
        })

    return Number( day )
}