import { FC } from 'react'
import { ButtonOutlineLight, ButtonPrimary, ModalFormHeader, UploadImages } from '@/components'

import styles from './ImageModal.module.scss'

interface Props {
    onClose: () => void
}
export const ImageModal:FC<Props> = ({ onClose }) => {

    return (
        <div className={ styles['image-modal'] }>
            <ModalFormHeader
                title="Imagenes"
                onClose={ onClose }
            />
            <div className={ styles['image-modal__upload'] }>
               <UploadImages />
            </div>
            <div className={ styles['image-modal__images-list'] }>
                images
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
