import { FC } from 'react'
import { RefreshIcon } from '@/components/Icons'

import styles from './ButtonRefresh.module.scss'

interface Props {
    onClick: ()=> void
}
export const ButtonRefresh:FC<Props> = ({ onClick }) => {
    return (
        <button
            onClick={ onClick }
            className={ styles['button'] }
        >
            <RefreshIcon />
        </button>
    )
}
