

export const getSku = ():string => {
    const date = Date.now().toString(36)
    const letters = date.slice( date.length - 3, date.length ).toUpperCase()
    
    return letters + Date.now() 
}