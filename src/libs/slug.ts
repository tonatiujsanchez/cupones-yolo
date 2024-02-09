import slugify from 'slugify'

export const getSlug = (text:string):string => {

    const options = {
        replacement: '-',
        lower: true,
        remove: /[*+~.()'"!:@,[\]{}?¿=#/\\;°¡¨`^¬]/g
    }

    const slug = slugify(text, options )
    return slug
}

export const isValidSlug = (slug:string) => {
    /* Expresión regular para verificar si el slug contiene solo caracteres alfanuméricos, guiones y barras bajas,
        y no incluye caracteres especiales adicionales */
    const regex = /^[a-zA-Z0-9-_]+$/

    return regex.test(slug) 
};