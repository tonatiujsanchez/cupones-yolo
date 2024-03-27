import { FC } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components'
import { GRAY_LIGHT_COLOR } from '@/constants'
import { IImage } from '@/interfaces'

import styles from './ImageItem.module.scss'

interface Props {
    image: IImage
    isSelectedImage: boolean
    onChangeSelectedImages: ( image: IImage )=> void
}
export const ImageItem:FC<Props> = ({ image, isSelectedImage, onChangeSelectedImages }) => {
    return (
        <div
            onClick={ ()=> onChangeSelectedImages( image ) } 
            className={ styles['image-item'] }
        >
            <div className={`${ styles['image-item__content'] } ${ isSelectedImage ? styles['image-item__selected'] : '' }`}>
                <Image
                    src={ image.url }
                    alt={ image.originalFilename }
                    title={ image.originalFilename }
                    width={ 300 }
                    height={ 100 }
                    className={ styles['image-item__img'] }
                />
            </div>
            <p className={styles['image-item__original-filename']}>{ image.originalFilename }</p>
            <div>
                
            </div>
            <div className={ styles['image-item__check'] }>
                <Checkbox 
                    checked={ isSelectedImage } 
                    onChange={()=> {}} 
                    text=""
                    borderColor={ GRAY_LIGHT_COLOR }
                />
            </div>
        </div>
    )
}
