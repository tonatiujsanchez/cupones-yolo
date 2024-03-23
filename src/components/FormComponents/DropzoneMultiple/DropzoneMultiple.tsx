import { FC, useState } from 'react'
import { UploadCloudIcon } from '@/components/Icons'
import { IImage } from '@/interfaces'

import styles from './DropzoneMultiple.module.scss'
import { ModalContainer, ImageModal } from '@/components'

interface Props {
    values      : IImage[]
    onChange    : ( value:IImage[] )=>void
    placeholder?: string
    dimensions? : string
}
export const DropzoneMultiple:FC<Props> = ({values, onChange, placeholder="Seleccionar imagen", dimensions }) => {

    const [showImageModal, setShowImageModal] = useState(false)

    const showModalimages = () => {
        // Abrir el modal de imágenes y ejecutar el onChange cuando haya un cambio en el array de imágenes selecionadas
    }

    const onCloseImageModal = ()=> {
        setShowImageModal(false)
    }

    return (
        <>        
            <div 
                onClick={ ()=> setShowImageModal(true) }
                className={ styles['dropzone'] }
            >
                <div className={ styles['dropzone__content'] }>
                    <UploadCloudIcon />
                    <span>{ placeholder }</span>
                    <span className={ styles['dropzone__dimensions'] }>
                        { dimensions && dimensions }
                    </span>
                </div>
            </div>
            <ModalContainer
                show={ showImageModal }
                onHidden={ onCloseImageModal }
            >
                <ImageModal
                    onClose={ onCloseImageModal }
                />
            </ModalContainer>
        </>
    )
}
