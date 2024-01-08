import { FC, useEffect } from 'react'
import styles from './Overlay.module.scss'

interface Props {
    onClick?: () => void
}
export const Overlay: FC<Props> = ({ onClick }) => {

    useEffect(() => {
        const body = document.querySelector('body')
        body!.classList.add('fixed-body')

        return () => {
            body!.classList.remove('fixed-body')
        }
    }, [])

    return (
        <div className={ styles['overlay'] } onClick={ onClick }></div>
    )
}
