import { FC, useState } from 'react'
import { ButtonOutlineLight, ButtonPrimary, ModalFormHeader, UploadImages, ImageList, Pagination } from '@/components'
import { useGetImage } from '@/hooks'
import { OPTIONS_IMAGES_SECTIONS } from '@/constants'
import { includesImage } from '@/utils'
import { IImage, ISectionImage, ISelectOption } from '@/interfaces'

import styles from './ImageModal.module.scss'

interface Props {
    values  : IImage[]
    onChange: ( values: IImage[] )=> void
    section : ISectionImage
    onClose : () => void
    
}
export const ImageModal:FC<Props> = ({ values, onChange, section, onClose  }) => {

    const [curentSection, setCurentSection] = useState<ISelectOption>(OPTIONS_IMAGES_SECTIONS[0])
    const [selectedImages, setSelectedImages] = useState<IImage[]>( values )
    
    const { imagesQuery, handlePageClick } = useGetImage({ section: curentSection.value, page: 1 })

    const onChangeSelectedImages = ( image: IImage ) => {

        const imageIsSelected = includesImage( image, selectedImages )

        if( imageIsSelected ){
            // Quitar imagen
            const selectedImagesUpdated = selectedImages.filter( img => img.url !== image.url )
            return setSelectedImages(selectedImagesUpdated)
        }

        // Añadir imagen 
        setSelectedImages([ ...selectedImages, image ])
    }

    const handleChangeImages = () => {
        onChange( selectedImages )
        onClose()
    }

    return (
        <div className={ styles['image-modal'] }>
            <ModalFormHeader
                title="Imagenes"
                onClose={ onClose }
            />
            <div className={ styles['image-modal__upload'] }>
               <UploadImages
                    page={ imagesQuery.data?.currentPage ?? 1 }
                    section={ section }
                    curentSection={ curentSection }
               />
            </div>
            <div className={ `custom-scroll ${ styles['image-modal__images-list'] }` }>
                {
                    imagesQuery.isPending
                    ?(
                        <div className={ styles['loader-container'] }>
                            <span className="loader-cube"></span>
                        </div>
                    ):(

                        <ImageList
                            images={ imagesQuery.data?.images ?? [] }
                            selectedImages={ selectedImages }
                            onChangeSelectedImages={ onChangeSelectedImages }
                        />
                    )
                }
            </div>
            <footer className={ styles['image-modal__footer'] }>
                <div className={styles['footer__pagination']}>
                    <Pagination
                        currentPage={ imagesQuery.data?.currentPage ?? 1 }
                        pageCount={ imagesQuery.data?.totalPages ?? 1 }
                        onPageChange={ handlePageClick }
                    />
                </div>
                <div className={ styles['footer__actions'] }>
                    <ButtonOutlineLight
                        type="button"
                        onClick={ onClose }
                    >
                        Cancelar
                    </ButtonOutlineLight>
                    <ButtonPrimary
                        type="button"
                        onClick={ handleChangeImages }
                        className={ styles['footer__actions--button-add'] }            
                    >
                        Aceptar
                    </ButtonPrimary>
                </div>
            </footer>
        </div>
    )
}
