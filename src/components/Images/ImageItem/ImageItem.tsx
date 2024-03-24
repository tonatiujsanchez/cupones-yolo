import { FC } from 'react'
import Image from 'next/image'
import { IImage } from '@/interfaces'

import styles from './ImageItem.module.scss'

interface Props {
    image: IImage
}
export const ImageItem:FC<Props> = ({ image }) => {
    return (
        <div className={ styles['image-item'] }>
            <div className={ styles['image-item__content'] }>
                <Image
                    src={ image.url }
                    alt={ image.alt ?? '' }
                    title={ image.title ?? '' }
                    width={ 300 }
                    height={ 100 }
                    className={ styles['image-item__img'] }
                />
            </div>
        </div>
    )
}
