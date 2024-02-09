import { FC } from 'react'
import { UploadCloudIcon } from '@/components/Icons'

import styles from './Dropzone.module.scss'

interface Props {
    onClick     : ()=>void
    placeholder?: string
    dimensions? : string
}
export const Dropzone:FC<Props> = ({ onClick, placeholder="Seleccionar imagen", dimensions }) => {
    return (
        <div 
            onClick={ onClick }
            className={ styles['dropzone'] }
        >
            <UploadCloudIcon />
            <span>{ placeholder }</span>
            <span className={ styles['dropzone__dimensions'] }>
                { dimensions && dimensions }
            </span>
        </div>
    )
}
