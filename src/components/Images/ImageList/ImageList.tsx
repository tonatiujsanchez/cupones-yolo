import { FC } from 'react'
import { ImageItem } from '@/components'
import { IImage } from '@/interfaces'
import styles from './ImageList.module.scss'

interface Props {
    images: IImage[]
}
export const ImageList:FC<Props> = ({ images }) => {
    return (
        <div className={ styles['image-list'] }>
            {
                images.map( image => (
                    <ImageItem 
                        key={ image._id }
                        image={ image }
                    />
                ))
            }
        </div>
    )
}
