import { FC, CSSProperties, ReactNode } from 'react'
import { CakeIcon, CouponIcon, GiftIcon, PercentIcon, ShoppingBagIcon, ShoppingCartIcon, StarIcon } from '@/components/Icons'
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '@/constants'
import { ButtonType } from '@/interfaces'

import styles from './ButtonIconsAnimated.module.scss'


interface Props {
    children     : ReactNode
    onClick?     : () => void
    type?        : ButtonType
    disabled?    : boolean
    stylesInline?: CSSProperties
}
export const ButtonIconsAnimated:FC<Props> = ({ children, onClick, type='button', disabled=false, stylesInline }) => {
    return (
        <button
            type={ type }
            className={ styles.button }
            style={{
                ...stylesInline
            }}
            disabled= { disabled }
            onClick={ onClick }
        >
            { children }
            <div className={ styles['star-1'] }>
                <ShoppingBagIcon
                    fill={ PRIMARY_LIGHT_COLOR }
                    stroke={ PRIMARY_COLOR }
                />
            </div>
            <div className={ styles['star-2'] }>
                <GiftIcon
                    fill={ PRIMARY_LIGHT_COLOR }
                    stroke={ PRIMARY_COLOR }
                />
            </div>
            <div className={ styles['star-3'] }>
                <CouponIcon
                    fill={ PRIMARY_LIGHT_COLOR } 
                    stroke={ PRIMARY_COLOR }
                />
            </div>
            <div className={ styles['star-4'] }>
                <PercentIcon
                    fill={ 'none' }
                    stroke={ PRIMARY_LIGHT_COLOR }
                />
            </div>
            <div className={ styles['star-5'] }>
                <ShoppingCartIcon
                    fill={ PRIMARY_LIGHT_COLOR }
                    stroke={ PRIMARY_COLOR }
                />
            </div>
            <div className={ styles['star-6'] }>
                <StarIcon
                    fill={ PRIMARY_LIGHT_COLOR }
                    stroke={ PRIMARY_COLOR }
                />
            </div>
            <div className={ styles['star-7'] }>
                <CakeIcon
                    fill={ PRIMARY_LIGHT_COLOR }
                    stroke={ PRIMARY_COLOR } 
                />
            </div>
        </button>
    )
}
