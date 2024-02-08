import { FC, CSSProperties, ReactNode } from 'react'
import NextLink from 'next/link'

import styles from './LinkPrimary.module.scss'


interface Props {
    children     : ReactNode
    href         : string
    stylesInline?: CSSProperties
}
export const LinkPrimary:FC<Props> = ({ children, stylesInline, href }) => {
    return (
        <NextLink 
            href={ href }
            className={ styles.button }
            style={{
                ...stylesInline
            }}
        >
            { children }
        </NextLink>
    )
}
