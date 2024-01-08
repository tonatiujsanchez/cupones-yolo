import { FC, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { CouponCard, ModalContainer } from '@/components'
import { PlusCircleIcon } from '@/components/Icons'

import { ICouponLite } from '@/interfaces'
import styles from './CouponCards.module.scss'


interface Props {
    value   : ICouponLite[]
    onChange: ( value: ICouponLite[] )=> void
    error?  : Merge<FieldError, Merge<FieldError, FieldErrorsImpl<ICouponLite>>>
}
export const CouponCards:FC<Props> = ({ value, onChange, error }) => {

    const [showAddCouponModal, setShowAddCouponModal] = useState(false)

    return (
        <>
            <div>
                <div className={ styles['coupons__container'] }>
                    {   value.length >= 1 &&
                        value.map( coupon => (
                            <div 
                                key={ coupon.title } 
                                className={ styles['coupons__content'] }
                            >
                                <CouponCard
                                    value={ coupon.value }
                                    title={ coupon.title }
                                />
                            </div>
                        ))
                    }
                    <div className={ styles['coupons__content'] }>
                        <button
                            type="button" 
                            // onClick={ ()=>  onChange([ ...value, ...value ]) }
                            onClick={ ()=>  setShowAddCouponModal(true) }
                            className={ styles['coupons__add-button'] }
                        >
                            <PlusCircleIcon /> Agregar cupón
                        </button>
                    </div>
                </div>
                {
                    error &&
                    <span className={`error-message ${styles['error']}`}>{ error.message }</span>
                }
            </div>
            {/* TODO: Añadir modal */}
            <ModalContainer
                show={ showAddCouponModal }
                onHidden={ ()=> setShowAddCouponModal(false) }
            >
                <p>Hola desde modal</p>
                {/* <AddCouponForm /> */}
            </ModalContainer>
           
        </>
    )
}
