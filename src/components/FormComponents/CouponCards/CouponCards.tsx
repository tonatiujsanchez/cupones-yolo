import { FC, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { CouponAddForm, CouponCard, Dropdown, ModalContainer, ModalDelete } from '@/components'
import { EditIcon, EllipsisVerticalIcon, PlusCircleIcon, TrashIcon } from '@/components/Icons'

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
    const [removeCoupon, setRemoveCoupon] = useState<ICouponLite>()


    const onAddCouponSubmit = ( coupon:ICouponLite ) => {
        if(editCoupon){
            onChange( value.map( couponState => couponState._id === coupon._id ? coupon : couponState ) )
        }else {
            coupon._id = String( Date.now() )
            onChange([ ...value, coupon ])
        }
    }
    
    const onCloseAddCouponModal = () => {
        setEditCoupon(undefined)
        setShowAddCouponModal(false)
    }

    const onCloseDeleteCouponModal = () => {
        setRemoveCoupon( undefined )
    }

    const onShowDeleteModal = ( confirm:boolean ) => {
        if( confirm ){
            onChange( value.filter( couponState => couponState._id !== removeCoupon?._id ) )
        }
        onCloseDeleteCouponModal()
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
                                                icon: <EditIcon />,
                                                label: 'Editar',
                                                action: ()=> setEditCoupon( coupon ),
                                                className: styles['edit-option']
                                            },
                                            {
                                                icon: <TrashIcon />,
                                                label: 'Remover',
                                                action: ()=> setRemoveCoupon( coupon ),
                                                className: styles['remove-option']
                                            }
                                        ]}
                                        className={ styles['dropdown'] }
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
                show={ showAddCouponModal || !!editCoupon }
                onHidden={ onCloseAddCouponModal }
            >
                <CouponAddForm 
                    onSubmit={ onAddCouponSubmit }
                    onClose={ onCloseAddCouponModal }
                    coupon={ editCoupon }
                />
            </ModalContainer>
            <ModalContainer
                show={ !!removeCoupon }
                onHidden={ onCloseDeleteCouponModal }
            >
                <ModalDelete
                    title="Remover cupón"
                    subtitle={
                        <p>
                            ¿Desea remover el cupón <strong>{ removeCoupon?.title }</strong> con el <strong>{ removeCoupon?.value }%</strong> de descuento?
                        </p>
                    }
                    onChange={ onShowDeleteModal }
                />
            </ModalContainer>

           
        </>
    )
}
