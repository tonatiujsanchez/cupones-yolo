import { FC, useState } from 'react'
import { UploadCloudIcon } from '@/components/Icons'
import { IImage, ISectionImage } from '@/interfaces'

import styles from './DropzoneMultiple.module.scss'
import { ModalContainer, ImageModal } from '@/components'

interface Props {
    values      : IImage[]
    onChange    : ( value:IImage[] )=>void
    section     : ISectionImage
    placeholder?: string
    dimensions? : string
}
export const DropzoneMultiple:FC<Props> = ({values, onChange, section, placeholder="Seleccionar imagen", dimensions }) => {

    const [showImageModal, setShowImageModal] = useState(false)

    const showModalimages = () => {
        setShowImageModal(true)
    }

    const onCloseImageModal = ()=> {
        setShowImageModal(false)
    }

    return (
        <>        
            <div 
                onClick={ showModalimages }
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
                    values={ values }
                    onChange={ onChange }
                    section={ section }
                    onClose={ onCloseImageModal }
                />
            </ModalContainer>
        </>
    )
}
