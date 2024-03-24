import { FC, useState } from 'react'
import { ButtonOutlineLight, ButtonPrimary, ModalFormHeader, UploadImages } from '@/components'
import { useGetImage } from '@/hooks'
import { OPTIONS_IMAGES_SECTIONS } from '@/constants'
import { ImageList } from '@/components'
import { ISectionImage, ISelectOption } from '@/interfaces'
import styles from './ImageModal.module.scss'

interface Props {
    onClose : () => void
    section : ISectionImage
    
}
export const ImageModal:FC<Props> = ({ onClose, section }) => {
    const [curentSection, setCurentSection] = useState<ISelectOption>(OPTIONS_IMAGES_SECTIONS[0])

    const { imagesQuery, handlePageClick } = useGetImage({ section: curentSection.value, page: 1 })

    console.log(imagesQuery.data)

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
                <ImageList
                    images={ imagesQuery.data?.images ?? [] }
                />
            </div>
            <footer className={ styles['image-modal__footer'] }>
                <div className={styles['footer__pagination']}>
                    Pagination
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
                        onClick={ ()=>{} }
                        className={ styles['footer__actions--button-add'] }            
                    >
                        Añadir
                    </ButtonPrimary>
                </div>
            </footer>
        </div>
    )
}
