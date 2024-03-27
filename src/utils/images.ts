import { IImage } from '@/interfaces'

export const includesImage = ( image:IImage , images:IImage[] ):boolean => {
    return images.some( img => img.url === image.url )
}
