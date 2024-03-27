import { FC } from 'react'
import { ImageItem } from '@/components'
import { IImage } from '@/interfaces'
import styles from './ImageList.module.scss'
import { includesImage } from '@/utils'

interface Props {
    images: IImage[]
    selectedImages: IImage[]
    onChangeSelectedImages: ( image: IImage )=> void
}
export const ImageList:FC<Props> = ({ images, selectedImages, onChangeSelectedImages }) => {

    return (
        <div className={ styles['image-list'] }>
            {
                images.map( image => (
                    <ImageItem 
                        key={ image._id }
                        image={ image }
                        isSelectedImage={ includesImage( image, selectedImages ) }
                        onChangeSelectedImages={ onChangeSelectedImages }
                    />
                ))
            }
        </div>
    )
}
