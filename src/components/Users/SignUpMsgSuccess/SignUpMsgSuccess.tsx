import { FC } from 'react'
import styles from './SignUpMsgSuccess.module.scss'
import NextLink from 'next/link';

interface Props {
    msgSuccess: string
}
export const SignUpMsgSuccess:FC<Props> = ({ msgSuccess }) => {
    return (
        <div className={ styles['msg-success'] }>
            <p className={styles['msg-success__title']}>Cuenta Creada</p>
            <p className={styles['msg-success__msg']}>{ msgSuccess }</p>
            <NextLink 
                href="/iniciar-sesion"
                className={ styles['msg-success__link'] }
            >
                Iniciar Sesión
            </NextLink>
        </div>
    )
}
