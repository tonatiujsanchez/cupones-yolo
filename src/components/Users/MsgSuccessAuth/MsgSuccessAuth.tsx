import { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import styles from './MsgSuccessAuth.module.scss'

interface Props{
    title   : string
    children: ReactNode
}
export const MsgSuccessAuth:FC<Props> = ({ title, children }) => {
    return (
        <div className={styles['msg-success']}>
            <p className={styles['msg-success__title']}>{ title }</p>
            <p className={styles['msg-success__msg']}>
                { children }
            </p>
            <NextLink
                href="/iniciar-sesion"
                className={styles['msg-success__link']}
            >
                Iniciar Sesión
            </NextLink>
        </div>
    )
}
