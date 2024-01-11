import { FC, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { CouponAddForm, CouponCard, Dropdown, ModalContainer } from '@/components'
import { EllipsisVerticalIcon, PlusCircleIcon } from '@/components/Icons'
import { toastSuccess } from '@/libs'

import { ICouponLite } from '@/interfaces'
import styles from './CouponCards.module.scss'


interface Props {
    value   : ICouponLite[]
    onChange: ( value: ICouponLite[] )=> void
    error?  : Merge<FieldError, Merge<FieldError, FieldErrorsImpl<ICouponLite>>>
}
export const CouponCards:FC<Props> = ({ value, onChange, error }) => {

    const [showAddCouponModal, setShowAddCouponModal] = useState(false)
    const [editCoupon, setEditCoupon] = useState<ICouponLite>()


    const onAddCouponSubmit = ( coupon:ICouponLite ) => {
        onChange([ ...value, coupon ])
        toastSuccess('Cupón agregado')
    }

    return (
        <>
            <div>
                <div className={ styles['coupons__container'] }>
                    {   value.length >= 1 &&
                        value.map( coupon => (
                            <div 
                                key={ coupon.title + coupon.value } 
                                className={ styles['coupons__content'] }
                            >
                                <CouponCard
                                    value={ coupon.value }
                                    title={ coupon.title }
                                />
                                <div className={ styles['coupons__dropdown-content'] }>
                                    <Dropdown
                                        options={[
                                            {
                                                label: 'Editar',
                                                action: ()=> console.log('editar...')
                                            },
                                            {
                                                label: 'Eliminar',
                                                action: ()=> console.log('Eliminar...')
                                            }
                                        ]}
                                    >
                                        <EllipsisVerticalIcon />
                                    </Dropdown>
                                </div>
                            </div>
                        ))
                    }
                    <div className={ styles['coupons__content'] }>
                        <button
                            type="button" 
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
            <ModalContainer
                show={ showAddCouponModal }
                onHidden={ ()=> setShowAddCouponModal(false) }
            >
                <CouponAddForm 
                    onSubmit={ onAddCouponSubmit }
                    onClose={ ()=> setShowAddCouponModal(false) }
                    coupon={ editCoupon }
                />
            </ModalContainer>
           
        </>
    )
}
