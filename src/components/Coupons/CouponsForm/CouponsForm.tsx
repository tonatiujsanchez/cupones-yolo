import { FC, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { addDays, isAfter, isBefore, isSameDay } from 'date-fns'

import { useRegisterClient } from '@/hooks'
import { ButtonIconsAnimated, Checkbox, DatePicker, ModalContainer, RegisterCompleted, WarningModal } from '@/components'
import { CouponBorder } from '@/components/shapes'
import { ArrowRightIcon } from '@/components/Icons'

import { dateFormatLong, isEmail } from '@/utils'
import { IClientFormData } from '@/interfaces'
import styles from './CouponsForm.module.scss'

interface Props {
    pageTitle          : string
    pageSubtitle?      : string
    dateToRegisterStart: Date
    dateToRegisterEnd  : Date
    backgroundImage    : string
}
export const CouponsForm:FC<Props> = ({ pageTitle, pageSubtitle, dateToRegisterStart, dateToRegisterEnd, backgroundImage }) => {

    const [errorMessage, setErrorMessage] = useState('')

    const { clientMutation, clientRegistered, onCleanClientRegistered } = useRegisterClient()

    const { register, handleSubmit, control, formState: { errors } } = useForm<IClientFormData>({
        defaultValues:{
            name: '',
            phone: null,
            email: '',
            receivePromotions: false
        }
    })

    const onCouponsSubmit = ( data:IClientFormData ) => {

        // Validación que la petición de registro este dentro del rango de fechas permitidas
        const today = new Date()
        const dateStart = addDays(new Date(dateToRegisterStart), 1)  
        const dateEnd = addDays( new Date(dateToRegisterEnd), 1 )

        if( isBefore(today, dateStart) && !isSameDay(today, dateStart) ){
            return setErrorMessage(`El registro estará disponible a partir del día ${ dateFormatLong(dateToRegisterStart) }`)
        }
    
        if( isAfter(today, dateEnd) && !isSameDay(today, dateStart) ){
            return setErrorMessage(`La fecha límite para registrarse fue el día ${ dateFormatLong( dateToRegisterEnd ) }`)
        }

        // Validación que el mes actual coincida con el mes de cumpleaños del usuario
        const currentMonth = new Date().getMonth()
        const birthdateMonth = new Date(data.birthdate).getMonth()
        
        if( currentMonth !== birthdateMonth ){
            return setErrorMessage('Lo sentimos, pero en este momento solo estamos aceptando registros de personas que cumplan años en el mes de enero. Apreciamos tu interés y te invitamos a intentarlo nuevamente en tu mes de cumpleaños.')
        }
        
        clientMutation.mutate( data )
    }

    useEffect(()=> {
        if( clientMutation.error ) {
            setErrorMessage( clientMutation.error.response?.data.msg || 'Hubo un error a realizar el registro' )
        }
    },[clientMutation.error])


    if( clientRegistered ){
        return (
            <RegisterCompleted
                clientRegistered={ clientRegistered }
                onCleanClientRegistered = { onCleanClientRegistered }
            />
        )
    }

    return (
        <>
            <section className={ styles['coupons-container'] }>
                <div 
                    className={`container ${ styles['coupons-content'] }`}
                    style={{
                        backgroundColor: 'rgb(226,207,190)',
                        background: `radial-gradient(circle, rgba(226,207,190,0.1) 0%, rgba(255,121,84,0.3) 36%, rgba(218,82,3,0.5) 69%), url(${ backgroundImage })`,
                        backgroundPosition: 'top 35% center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                >
                    <div className={ styles['coupons-title__container'] }>
                        <h1 className={styles['coupons-title']}>{ pageTitle }</h1>
                        {
                            pageSubtitle && (
                                <p className={ styles['coupons-subtitle'] }>{ pageSubtitle }</p>
                            )
                        }
                    </div>
                    <form
                        onSubmit={ handleSubmit( onCouponsSubmit ) } 
                        className={styles['coupons-form']}
                    >
                        <figure className={ `${styles['form-border']} ${styles['form-border-start']}` }>
                            <CouponBorder />
                        </figure>
                        <figure className={ `${styles['form-border']} ${styles['form-border-end']}` }>
                            <CouponBorder />
                        </figure>
                        <div className={ styles['form-fields-container'] }>
                            <div className={ styles['form-field'] }>
                                <label htmlFor="name">Nombre completo<span className="required-asterisk">*</span></label>
                                <input 
                                    type="text"
                                    id="name"
                                    placeholder="Ingrese su nombre completo"
                                    { ...register('name', {
                                        required: 'El nombre es requerido',
                                        validate: (val) => val && val.trim().length >= 4 ? undefined : 'El nombre es muy corto'
                                    })}
                                />
                                {
                                    !!errors.name &&
                                    <span className={ styles['error-message'] }>{ errors.name.message }</span>
                                }
                            </div>
                            <div className={ styles['form-field'] }>
                                <label  htmlFor="phone">Celular<span className="required-asterisk">*</span></label>
                                <input 
                                    type="number" 
                                    id="phone"
                                    placeholder="Número de celular"
                                    { ...register('phone', {
                                        required: 'El numero es requerido',
                                        validate: (val) => val?.toString().length === 10 ? undefined : 'Nùmero no vàlido'
                                    }) }
                                />
                                {
                                    !!errors.phone &&
                                    <span className={ styles['error-message'] }>{ errors.phone.message }</span>
                                }
                            </div>
                            <div className={ styles['form-field'] }>
                                <label htmlFor="datePicker">Fecha de Nacimiento<span className="required-asterisk">*</span></label>
                                <Controller
                                    control={ control }
                                    name="birthdate"
                                    render={({ field })=>(
                                        <DatePicker
                                            value={ field.value }
                                            onChange={ field.onChange }
                                        />
                                    )}
                                    rules={{required: 'Seleccione su fecha de nacimiento' }}
                                />
                                {
                                    errors.birthdate &&
                                    <span className={ styles['error-message'] }>{ errors.birthdate.message }</span>
                                }
                            </div>
                            <div className={ styles['form-field'] }>
                                <label htmlFor="number">Correo <span style={{ fontSize: '1.3rem', opacity: 0.8 }}>(opcional)</span></label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="Ingrese su correo"
                                    { ...register('email', {
                                        validate: (value)=> value ? isEmail(value) : undefined
                                    })}
                                />
                                {
                                    !!errors.email &&
                                    <span className={ styles['error-message'] }>{ errors.email.message }</span>
                                }
                            </div>
                            <div className={ styles['checkbox-container'] }>
                                <Controller
                                    control={ control }
                                    name="receivePromotions"
                                    render={({ field })=>(
                                        <Checkbox
                                            checked={ field.value}
                                            onChange={ field.onChange }
                                            text="Recibir futuras promociones a mi whatsapp y/o correo"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className={styles['button-container']} >
                            <ButtonIconsAnimated
                                type="submit"
                                disabled={ clientMutation.isPending }
                            >
                                {
                                    clientMutation.isPending 
                                        ? <div className="custom-loader-white"></div>
                                        : (
                                            <>
                                                Obtener cupones
                                                <ArrowRightIcon />
                                            </>
                                        )
                                }
                            </ButtonIconsAnimated>
                        </div>
                    </form>
                </div>
            </section>
            <ModalContainer
                show={ !!errorMessage }
                onHidden={ ()=> setErrorMessage('') }

            >
                <WarningModal
                    title="Lo sentimos"
                    subtitle={ errorMessage }
                    onChange={ ()=> setErrorMessage('') }
                />
            </ModalContainer>
        </>
    )
}
