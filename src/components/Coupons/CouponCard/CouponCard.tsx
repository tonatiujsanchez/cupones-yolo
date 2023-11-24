import { FC, useEffect, useRef } from 'react'
import { GiftSolidIcon } from '@/components/Icons'

import { WHITE_COLOR } from '@/constants'
import styles from './CouponCard.module.scss'


interface CustomMouseEvent extends MouseEvent {
    layerX : number
    layerY : number
}

interface Props {
    title: string
    value: number
}

export const CouponCard:FC<Props> = ({ title, value }) => {

    const cardRef = useRef<HTMLElement>(null)

    useEffect(()=>{

        const cardElement = cardRef.current!
        const cardElementChild = cardElement.firstElementChild as HTMLElement
        
        const cardHeight = cardElement.clientHeight
        const cardWidth  = cardElement.clientWidth

        const handleMouseMove = (ev:MouseEvent) => {
            
            const coordX = (ev as CustomMouseEvent).layerX
            const coordY = (ev as CustomMouseEvent).layerY
            
            const yRotation = ( ( coordX - cardWidth / 2 ) /cardWidth ) * 30
            const xRotation = ( ( coordY - cardHeight / 2 ) /cardHeight ) * 40
            
            cardElementChild.style.transitionDuration = '0.5s'
            cardElementChild.style.transform = `
                perspective(1000px)
                rotateX(${ xRotation }deg)
                rotateY(${ yRotation }deg)
                scale(1.08)
            `
        }

        const handleMouseOut = () => {
            cardElementChild.style.transitionDuration = '3s'
            cardElementChild.style.transform = `
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `
        }

        cardElement.addEventListener( 'mousemove', handleMouseMove)
        cardElement.addEventListener( 'mouseout', handleMouseOut)

        return ()=> {
            cardElement.removeEventListener('mousemove', handleMouseMove)
            cardElement.removeEventListener('mouseout', handleMouseOut)
        }
    },[])
    
    
    return (
        <article ref={ cardRef } className={ styles['coupon-container'] }>
            <div className={ styles['coupon-content'] }>
                <div className={ styles['coupon-content__icon'] }>
                    <GiftSolidIcon fill={ WHITE_COLOR } />
                </div>
                <div className={ styles['coupon-content__description'] }>
                    <p className={ styles['coupon-content__value'] }>{ value }%</p>
                    <p>{ title }</p>
                </div>
            </div>
        </article>
    )
}
