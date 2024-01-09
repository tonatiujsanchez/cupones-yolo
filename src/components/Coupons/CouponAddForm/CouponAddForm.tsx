import { FC } from 'react'
import { ButtonPrimary, InputText, ModalFormHeader } from '@/components'
import { ICouponLite } from '@/interfaces'

import styles from './CouponAddForm.module.scss'
import { useForm } from 'react-hook-form'


interface Props {
    onSubmit: ( coupon:ICouponLite )=> void
    coupon? : ICouponLite
    onClose : ()=> void
}
export const CouponAddForm:FC<Props> = ({ onSubmit, coupon, onClose }) => {

    const { register, handleSubmit, formState:{ errors } } = useForm<ICouponLite>({
        defaultValues: {
            title: '',
            value: 0
        }
    })

    const onAddCoupon = ( data:ICouponLite ) => {
        console.log( data )
    }

    return (
        <div onSubmit={ handleSubmit( onAddCoupon ) } className={ styles['form'] }>
            <ModalFormHeader
                title={ coupon ? 'Editar Cupón' : 'Nuevo Cupón' }
                onClose={ onClose }
            />
            <div className={ styles['form_fields-container'] }>
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
                    onClick={ handleSubmit( onAddCoupon ) }
                >
                    Agregar
                </ButtonPrimary>
            </div>
        </div>
    )
}
