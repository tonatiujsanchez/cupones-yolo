import { FC } from 'react'
import { ButtonPrimary, CouponCard } from '@/components'
import { ArrowLeftIcon } from '@/components/Icons'

import { IClient, ICoupon } from "@/interfaces"
import styles from './RegisterCompleted.module.scss'


interface Props {
    clientRegistered       : IClient
    onCleanClientRegistered: () => void
}

export const RegisterCompleted:FC<Props> = ({ clientRegistered, onCleanClientRegistered }) => {
    
    const { congratulationTitle, congratulationSubtitle, conditions, name, phone, coupons } = clientRegistered

    return (
        <section className={`container ${ styles['register-completed'] }`}>
            <div className={ styles['title-container'] }>
                <p className={ styles['congratulations-title'] }>{ congratulationTitle }</p>
                <h1 className={ styles['client-name'] }>{ name }</h1>
                {
                    congratulationSubtitle && (
                        <div className={ styles['heading'] } dangerouslySetInnerHTML={{ __html: congratulationSubtitle }}></div>
                    )
                }
                <div className={ styles['conditions'] } dangerouslySetInnerHTML={{ __html: conditions }}></div>
            </div>
            <div className={ styles['coupons-container'] }>
                {
                    coupons.map( (coupon) => (
                        <CouponCard
                            key={ (coupon as ICoupon)._id }
                            value={ ( coupon as ICoupon ).value }
                            title={ (coupon as ICoupon).title }
                        />
                    ))
                }
            </div>
            <div className={ styles['phone-client__container'] }>
                <p className="text-xl text-slate-800">Los cupones se enviarán al número <span className="font-bold underline text-slate-800">{ phone }</span></p>
            </div>
            <div className={styles['button-container']} >
                <ButtonPrimary
                    type="button"
                    onClick={ onCleanClientRegistered }
                >
                    <ArrowLeftIcon />
                    Regresar
                </ButtonPrimary>
            </div>
        </section>
    )
}
