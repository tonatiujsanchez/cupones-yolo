import { FC, useEffect } from 'react'
import { ButtonPrimary, InputText, ModalFormHeader } from '@/components'
import { ICouponLite } from '@/interfaces'

import styles from './CouponAddForm.module.scss'
import { useForm } from 'react-hook-form'


interface Props {
    onSubmit: ( coupon:ICouponLite )=> void
    onClose : ()=> void
    coupon? : ICouponLite
}
export const CouponAddForm:FC<Props> = ({ onSubmit, onClose, coupon }) => {

    const { register, handleSubmit, formState:{ errors }, reset } = useForm<ICouponLite>({
        defaultValues: {
            title: '',
        }
    })

    useEffect(()=>{
        if( coupon ) {
            reset(coupon)
        }
    },[reset, coupon])

    const onAddCoupon = ( data:ICouponLite ) => {
        onSubmit( data )
        onClose()
    }

    return (
        <div onSubmit={ handleSubmit( onAddCoupon ) } className={ styles['form'] }>
            <ModalFormHeader
                title={ coupon ? 'Editar Cupón' : 'Nuevo Cupón' }
                onClose={ onClose }
            />
            <div className={ styles['form_fields-container'] }>
                <InputText
                    type="number"
                    label="Porcentaje de descuento"
                    fieldName="value"
                    placeholder="10"
                    error={ errors.value }
                    { ...register("value", {
                        required: 'Ingrese el porcentaje de descuento',
                        validate: ( value )=> Number(value) <= 0 || Number(value) > 100 ? 'Valor no válido, min 1 - max 100' : undefined
                    })}
                    min={ 1 }
                    max={ 100 }
                    isRequired
                />
                <InputText
                    type="text"
                    label="Título del cupón"
                    fieldName="title"
                    placeholder="Ingrese el título del cupón"
                    error={ errors.title }
                    { ...register("title", {
                        required: 'Ingrese el título del cupón'
                    })}
                    isRequired
                />
            </div>
            <div className="button-container">
                <ButtonPrimary
                    type="submit"
                    onClick={ handleSubmit( onAddCoupon ) }
                >
                    { coupon ? 'Editar' : 'Agregar' }
                </ButtonPrimary>
            </div>
        </div>
    )
}
