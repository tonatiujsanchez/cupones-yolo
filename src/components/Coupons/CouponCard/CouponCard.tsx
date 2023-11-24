import { FC, useEffect, useRef } from 'react'
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
                scale(1.07)
            `
        }

        const handleMouseOut = () => {
            cardElementChild.style.transitionDuration = '2s'
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
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="96" height="96" viewBox="0 0 24 24" 
                        style={{fill: "#FFF"}}>
                            <path d="M5 12H4v8a2 2 0 0 0 2 2h5V12H5zm13 0h-5v10h5a2 2 0 0 0 2-2v-8h-2zm.791-5A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H2v4h9V9h2v2h9V7h-3.209zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM15.5 4c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.477c.51-1.576 1.251-3 1.977-3z"></path>
                    </svg>
                </div>
                <div className={ styles['coupon-content__description'] }>
                    <p className={ styles['coupon-content__value'] }>{ value }%</p>
                    <p>{ title }</p>
                </div>
            </div>
        </article>
    )
}
