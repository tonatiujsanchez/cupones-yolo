import { FC } from 'react'
import { UploadCloudIcon } from '@/components/Icons'

import styles from './DropzoneMultiple.module.scss'
import { IImage } from '@/interfaces'

interface Props {
    values      : IImage[]
    onChange    : ( value:IImage[] )=>void
    placeholder?: string
    dimensions? : string
}
export const DropzoneMultiple:FC<Props> = ({values, onChange, placeholder="Seleccionar imagen", dimensions }) => {

    const showModalimages = () => {
        // Abrir el modal de imágenes y ejecutar el onChange cuando haya un cambio en el array de imágenes selecionadas
    }

    
    return (
        <div 
            onClick={ showModalimages }
            className={ styles['dropzone'] }
        >
            <UploadCloudIcon />
            <span>{ placeholder }</span>
            <span className={ styles['dropzone__dimensions'] }>
                { dimensions && dimensions }
            </span>
        </div>
    )
}
