import { FC, useState } from 'react'
import Image from 'next/image'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { ModalContainer, ImageModal } from '@/components'
import { UploadCloudIcon } from '@/components/Icons'
import { IImage, ISectionImage } from '@/interfaces'

import styles from './DropzoneMultiple.module.scss'

interface Props {
    values      : IImage[]
    onChange    : ( value:IImage[] )=>void
    section     : ISectionImage
    placeholder?: string
    dimensions? : string
    error?      : Merge<FieldError, Merge<FieldError, FieldErrorsImpl<IImage[]>>>
}
export const DropzoneMultiple:FC<Props> = ({values, onChange, section, placeholder="Seleccionar imagen", dimensions, error }) => {

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
                {
                    values.length === 0
                    ?(
                    <div className={ styles['dropzone__msg-content'] }>
                        <UploadCloudIcon />
                        <span>{ placeholder }</span>
                        <span className={ styles['dropzone__dimensions'] }>
                        { dimensions && dimensions }
                        </span>
                    </div>
                    ):(
                        <div className={ styles['dropzone__images'] }>
                            {
                                values.map( value => (
                                    <div key={ value._id } className={ styles['dropzone__img-content'] }>
                                        <Image
                                            src={ value.url }
                                            alt={ value.originalFilename }
                                            title={ value.originalFilename }
                                            width={ 300 }
                                            height={ 100 }
                                            className={ styles['dropzone__img'] }
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                error &&
                <span className="error-message">{error.message}</span>
            }
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
