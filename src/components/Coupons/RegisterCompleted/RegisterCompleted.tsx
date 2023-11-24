import { FC } from 'react'
import { CouponCard } from '@/components'

import { IClient } from "@/interfaces"
import styles from './RegisterCompleted.module.scss'



interface Props {
    clientRegistered: IClient
}

export const RegisterCompleted:FC<Props> = ({ clientRegistered }) => {
    
    const { name, phone } = clientRegistered

    return (
        <section className={`container ${ styles['register-completed'] }`}>
            <div className={ styles['title-container'] }>
                <p className={ styles['congratulations-title'] }>¡FELICIDADES!</p>
                <p className={ styles['client-name'] }>{ name }</p>
                <h1 className={ styles['heading'] }>Has ganado <span>2 cupones con el 10% y 15% de descuento</span> en tus próximas compras</h1>
                <p className={ styles['conditions'] }>Válidos solo durante el mes de <span>Noviembre</span> de 2023</p>
            </div>
            <div className={ styles['coupons-container'] }>
                <CouponCard
                    value={ 10 }
                    title={'En productos de la página oficial de SHEIN'}
                />
                <CouponCard
                    value={ 15 }
                    title={'En productos de nuestra tienda física'}
                />
            </div>
            <div className={ styles['phone-client__container'] }>
                <p className="text-xl text-slate-800">Los cupones se enviarán al número <span className="font-bold underline text-slate-800">{ phone }</span></p>
            </div>
        </section>
    )
}
