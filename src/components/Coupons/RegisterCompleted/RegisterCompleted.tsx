import { FC, useRef, useEffect } from 'react'
import { IClient } from "@/interfaces"

import styles from './RegisterCompleted.module.scss'


interface CustomMouseEvent extends MouseEvent {
    layerX : number
    layerY : number
}

interface Props {
    clientRegistered: IClient
}

export const RegisterCompleted:FC<Props> = ({ clientRegistered }) => {
    
    const cardRef = useRef<HTMLElement>(null)

    const { name, phone } = clientRegistered

    useEffect(()=>{

        const cardElement = cardRef.current!

        const cardHeight = cardElement.clientHeight
        const cardWidth  = cardElement.clientWidth

        const handleMouseMove = (ev:MouseEvent) => {
            
            const coordX = (ev as CustomMouseEvent).layerX
            const coordY = (ev as CustomMouseEvent).layerY
            
            const yRotation = ( ( coordX - cardWidth / 2 ) /cardWidth ) * 30
            const xRotation = ( ( coordY - cardHeight / 2 ) /cardHeight ) * 40
            
            const str = `
                perspective(1000px)
                rotateX(${ xRotation }deg)
                rotateY(${ yRotation }deg)
            `
            cardElement.style.transform = str

        };

        const handleMouseOut = () => {
            cardElement.style.transform = `
                rotateX(0)
                rotateY(0)
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
        <section className={`container ${ styles['register-completed'] }`}>
            <div className={ styles['title-container'] }>
                <p className={ styles['congratulations-title'] }>¡FELICIDADES!</p>
                <p className={ styles['client-name'] }>{ name }</p>
                <h1 className={ styles['heading'] }>Has ganado <span>2 cupones con el 10% y 15% de descuento</span> en tus próximas compras</h1>
                <p className={ styles['conditions'] }>Válidos solo durante el mes de <span>Noviembre</span> de 2023</p>
            </div>
            <div className={ styles['coupons-container'] }>
                <article ref={ cardRef } className={ styles['coupons-content'] }>
                    <div className={ styles['coupons-content__icon'] }>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="96" height="96" viewBox="0 0 24 24" 
                            style={{fill: "#FFF"}}>
                                <path d="M5 12H4v8a2 2 0 0 0 2 2h5V12H5zm13 0h-5v10h5a2 2 0 0 0 2-2v-8h-2zm.791-5A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H2v4h9V9h2v2h9V7h-3.209zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM15.5 4c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.477c.51-1.576 1.251-3 1.977-3z"></path>
                        </svg>
                    </div>
                    <div className={ styles['coupons-content__description'] }>
                        <p className={ styles['coupons-content__value'] }>10%</p>
                        <p className="">En productos de la página oficial de SHEIN</p>
                    </div>
                </article>

                <article className={ styles['coupons-content'] }>
                    <div className={ styles['coupons-content__icon'] }>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="96" height="96" viewBox="0 0 24 24" 
                            style={{fill: "#FFF"}}>
                                <path d="M5 12H4v8a2 2 0 0 0 2 2h5V12H5zm13 0h-5v10h5a2 2 0 0 0 2-2v-8h-2zm.791-5A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H2v4h9V9h2v2h9V7h-3.209zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM15.5 4c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.477c.51-1.576 1.251-3 1.977-3z"></path>
                        </svg>
                    </div>
                    <div className={ styles['coupons-content__description'] }>
                        <p className={ styles['coupons-content__value'] }>15%</p>
                        <p className="">En productos de nuestra tienda física</p>
                    </div>
                </article>
            </div>
            <div className={ styles['phone-client__container'] }>
                <p className="text-xl text-slate-800">Los cupones se enviarán al número <span className="font-bold underline text-slate-800">{ phone }</span></p>
            </div>
        </section>
    )
}
