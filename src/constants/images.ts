import { ISelectOption } from '@/interfaces';

export const IMAGES_QUERY_KEY = 'images'

export const IMAGES_SECTIONS = {
    products: 'products',
    covers  : 'covers',
    users   : 'users',
}

export const ALL_SECTIONS_OF_IMAGES = 'all'

export const IMAGES_SECTIONS_OPTIONS = Object.values( IMAGES_SECTIONS )

export const TYPE_OF_ACCEPTED_IMAGES = /image\/(png|jpg|jpeg|gif|webp)/i;

export const IMAGE_PAGE_SIZE = 20


export const OPTIONS_IMAGES_SECTIONS:ISelectOption[] = [
    {
        value: ALL_SECTIONS_OF_IMAGES,
        label:'Todos'
    },
    {
        value:IMAGES_SECTIONS.products,
        label:'Productos'
    },
    {
        value:IMAGES_SECTIONS.covers,
        label:'Portadas'
    },
]