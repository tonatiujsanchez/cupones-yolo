import { Controller, useForm } from 'react-hook-form'
import { ButtonPrimary, DatePickerBox, InputText } from '@/components'

import styles from './CouponSettingsSection.module.scss'


interface ICouponPageForm {
    pageTitle   : string
    pageSubtitle: string
    dateToRegisterStart : Date
    dateToRegisterEnd   : Date

    congratulationTitle   : string
    congratulationsubtitle: string
    conditions : string
    couponValidityStart: Date
    couponValidityEnd  : Date
}

export const CouponSettingsSection = () => {

    const { register, handleSubmit, control, formState:{ errors } } = useForm<ICouponPageForm>({
        defaultValues: {
            pageTitle: '',
            pageSubtitle: '',
            congratulationTitle: '',
            congratulationsubtitle: '',
        }
    })

    const onCouponPageSubmit = (data:ICouponPageForm) => {
        console.log( data )
    }

    return (
        <section className={ styles['coupon-settings-section'] }>
            <form
                className={ styles['coupon-settings-section__form'] } 
                onSubmit={ handleSubmit( onCouponPageSubmit ) }
            >
                <h6 className={ styles['coupon-settings-section__subtitle'] }>Página principal</h6>
                <div className={ styles['coupon-settings-section__content'] }>
                    <InputText
                        type="text"
                        label="Titulo de página"
                        fieldName="titlePage"
                        placeholder="Cupones del mes"
                        error={ errors.pageTitle }
                        { ...register('pageTitle', {
                            required: 'El título de la página es requerido'
                        })}
                    />
                    <InputText
                        type="text"
                        label="Subtítulo de página"
                        fieldName="subtitlePage"
                        placeholder="Registra y obten cupones de descuento"
                        { ...register('pageSubtitle')}
                    />
                    <div className={ `${ styles['date-picker'] }` }>
                        <p className={ styles['label'] }>Fecha para registrarse</p>
                        <div className={ styles['date-picker__content'] }>
                            <Controller
                                control={ control }
                                name="dateToRegisterStart"
                                render={( { field } )=>(
                                    <DatePickerBox
                                        fieldName="dateToRegisterStart"
                                        label="Inicio"
                                        value={ field.value }
                                        onChange={ field.onChange }
                                        error={ errors.dateToRegisterStart }
                                        className={ styles['date-picker__date'] }
                                    />
                                )}
                                rules={{ required: 'Seleccione la fecha de inicio para registrarse' }}
                            />
                            <Controller
                                control={ control }
                                name="dateToRegisterEnd"
                                render={( { field } )=>(
                                    <DatePickerBox
                                        fieldName="dateToRegisterEnd"
                                        label="Fin"
                                        value={ field.value }
                                        onChange={ field.onChange }
                                        error={ errors.dateToRegisterEnd }
                                        className={ styles['date-picker__date'] }
                                    />
                                )}
                                rules={{ required: 'Seleccione la fecha limite para registrarse' }}
                            />
                        </div>
                    </div>   
                </div>
                <h6 className={ styles['coupon-settings-section__subtitle'] }>Registro completado</h6>
                <div className={ styles['coupon-settings-section__content'] }>
                    <div>                        
                        <InputText
                            type="text"
                            label="Título de la felicitación"
                            fieldName="congratulationTitle"
                            placeholder="Facilidades"
                            error={ errors.congratulationTitle }
                            { ...register('congratulationTitle', {
                                required: 'El título de la felicitación es requerido'
                            })}
                        />
                        <InputText
                            type="text"
                            label="Subtítulo"
                            fieldName="congratulationsubtitle"
                            placeholder="Registro completado, has ganado 2 cupones."
                            error={ errors.congratulationsubtitle }
                            { ...register('congratulationsubtitle',{
                                required: 'El subtítulo de la felicitación es requerido'
                            })}
                        />                         
                    </div>
                    <div className={ styles['date-picker'] }>
                        <p className={ styles['label'] }>Vigencia de los cupones</p>
                        <div className={ styles['date-picker__content'] }>
                            <Controller
                                control={ control }
                                name="couponValidityStart"
                                render={({ field })=> (
                                    <DatePickerBox
                                        label="Inicio de vigencia"
                                        fieldName="couponValidityStart"
                                        value={ field.value }
                                        onChange={ field.onChange }
                                        error={ errors.couponValidityStart }
                                        className={ styles['date-picker__date'] }
                                    />
                                )}
                                rules={{ required: 'Seleccione la fecha inicio' }}
                            />
                            <Controller
                                control={ control }
                                name="couponValidityEnd"
                                render={({ field })=> (
                                    <DatePickerBox
                                        label="Fin"
                                        fieldName="couponValidityEnd"
                                        value={ field.value }
                                        onChange={ field.onChange }
                                        error={ errors.couponValidityEnd }
                                        className={ styles['date-picker__date'] }
                                    />
                                )}
                                rules={{ required: 'Seleccione la fecha caducidad' }}
                            />
                        </div>
                    </div> 
                </div>
                <div className={ styles['button-container'] }>
                    <ButtonPrimary type="submit">
                        Guardar
                    </ButtonPrimary>
                </div>
            </form>
        </section>
    )
}
