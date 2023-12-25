import { Controller, useForm } from 'react-hook-form'
import { ButtonPrimary, DatePicker, InputText } from '@/components'

import styles from './CouponSettingsSection.module.scss'

interface ICouponPageForm {
    pageTitle   : string
    pageSubtitle: string
    congratulationTitle   : string
    congratulationsubtitle: string
    conditions  : string
    couponCalidityStart: Date
    couponCalidityEnd: Date
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
                        <div className={ styles['calidity'] }>
                            <p className={ styles['label'] }>Vigencia</p>
                            <div className={ styles['calidity-content'] }>
                                <div className={ styles['calidity-date'] }>
                                    <label 
                                        htmlFor="couponCalidityStart"
                                        className={ styles['label'] }
                                    >
                                        Inicio
                                    </label>
                                    <Controller
                                        control={ control }
                                        name="couponCalidityStart"
                                        render={( { field } )=>(
                                            <DatePicker
                                                value={ field.value }
                                                onChange={ field.onChange }
                                            />
                                        )}
                                        rules={{ required: 'Seleccione la fecha inicio' }}
                                    />
                                </div>
                                <div className={ styles['calidity-date'] }>
                                    <label 
                                        htmlFor="couponCalidityEnd"
                                        className={ styles['label'] }
                                    >
                                        Fin
                                    </label>
                                    <Controller
                                        control={ control }
                                        name="couponCalidityEnd"
                                        render={( { field } )=>(
                                            <DatePicker
                                                value={ field.value }
                                                onChange={ field.onChange }
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
                    </div>
            </form>
        </section>
    )
}
