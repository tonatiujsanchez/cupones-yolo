import { FC } from 'react'
import Image from 'next/image'
import styles from './Avatar.module.scss'

interface Props {
    photo: string | null
    name : string
}
export const Avatar: FC<Props> = ({ photo, name }) => {
    return (
        photo
            ? (
                <figure className={styles['avatar__figure']}>
                    <Image
                        src={photo}
                        alt={name}
                        title={name}
                        width={100}
                        height={100}
                        className={styles['avatar__img']}
                    />
                </figure>
            ) : (
                <div className={ styles['no-avatar'] }>
                    { name.slice(0, 1) }
                </div>
            )
    )
}
