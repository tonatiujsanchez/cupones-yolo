import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonPrimary, CouponCards, DatePickerBox, ErrorMessage, InputText, Toggle, WYSIWYGEditorLite } from '@/components'

import { useGetCouponSettingsPage, useUpdateCouponSettingsPage } from '@/hooks'
import { ICouponSettingsPage } from '@/interfaces'
import styles from './CouponSettingsSection.module.scss'

export const CouponSettingsSection = () => {

    const { register, handleSubmit, control, formState:{ errors }, reset } = useForm<ICouponSettingsPage>({
        defaultValues: {
            pageTitle: '',
            pageSubtitle: '',
            coupons: [],

            congratulationTitle: '',
            congratulationSubtitle: '',
            conditions: '',
            pageActive: false
        }
    })
    const { couponSettingsPageQuery } = useGetCouponSettingsPage()
    const { updateCouponSettingsPage } = useUpdateCouponSettingsPage()

    useEffect(()=>{
        if(couponSettingsPageQuery.data) {
            reset({
                ...couponSettingsPageQuery.data
            })
        }
    },[couponSettingsPageQuery.data, reset])

    const onCouponPageSubmit = (data:ICouponSettingsPage) => {
        updateCouponSettingsPage.mutate( data )

        if( couponSettingsPageQuery.data?.pageActive !== data.pageActive ){
            // Actualizar rutas en la DB
            console.log('Se cambio')
        }
    }

    return (
        <section className={ styles['coupon-settings-section'] }>
            {
                couponSettingsPageQuery.isLoading && (
                    <div className={ styles['loader-container'] }>
                        <span className="loader-cube"></span>
                    </div>
                )
            }
            {
                couponSettingsPageQuery.error && (
                    <ErrorMessage
                        message="Hubo un error al cargar los registros"
                    />
                )
            }
            {
                couponSettingsPageQuery.data && (
                    <form
                        className={ styles['coupon-settings-section__form'] } 
                        onSubmit={ handleSubmit( onCouponPageSubmit ) }
                    >
                        <div>
                            <h6 className={ styles['coupon-settings-section__subtitle'] }>Página principal</h6>
                            <div>
                                <label>hola</label>
                                <Controller
                                    control={ control }
                                    name="pageActive"
                                    render={({ field })=>(
                                        <Toggle value={ field.value } onChange={ field.onChange }  />
                                    )}
                                />
                            </div>
                        </div>
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
                                isRequired
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
                                                isRequired
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
                                                isRequired
                                            />
                                        )}
                                        rules={{ required: 'Seleccione la fecha limite para registrarse' }}
                                    />
                                </div>
                            </div>
                            <div className={ styles['coupons'] }>
                                <p className={ styles['label'] }>Cupones</p>
                                <Controller
                                    control={ control }
                                    name="coupons"
                                    render={({ field })=>(
                                        <CouponCards
                                            value={ field.value }
                                            onChange={ field.onChange }
                                            error={ errors.coupons }
                                        />
                                    )}
                                    rules={{
                                        validate: ( value )=> value.length === 0 ? 'Es requerido al menos un cupón' : undefined
                                    }}
                                />
                            </div>
                        </div>
                        <h6 className={ styles['coupon-settings-section__subtitle'] }>Registro completado</h6>
                        <div className={ styles['coupon-settings-section__content'] }>
                            <InputText
                                type="text"
                                label="Título de la felicitación"
                                fieldName="congratulationTitle"
                                placeholder="Facilidades"
                                error={ errors.congratulationTitle }
                                { ...register('congratulationTitle', {
                                    required: 'El título de la felicitación es requerido'
                                })}
                                isRequired
                            />
                            <Controller
                                control={ control }
                                name="congratulationSubtitle"
                                render={({ field })=>(
                                    <WYSIWYGEditorLite
                                        label="Subtítulo"
                                        fieldName="congratulationSubtitle"
                                        placeholder="Registro completado, has ganado 2 cupones"
                                        onChange={ field.onChange }
                                        value={ field.value }
                                        error={ errors.congratulationSubtitle }
                                        className={ styles['html-editor__congratulation-subtitle'] }
                                        isRequired
                                    />
                                )}
                                rules={{ required: 'El subtítulo de la felicitación es requerido' }}
                            />
                            <Controller
                                control={ control }
                                name="conditions"
                                render={({ field })=> (
                                    <WYSIWYGEditorLite
                                        label="Condiciones"
                                        fieldName="conditions"
                                        placeholder="Válidos solo durante este mes"
                                        onChange={ field.onChange }
                                        value={ field.value }
                                        error={ errors.conditions }
                                        className={ styles['html-editor__conditions'] }
                                        isRequired
                                    />
                                )}
                                rules={{ required: 'Los terminos y condiciones son requeridos' }}
                            />
                            <div className={ styles['date-picker'] }>
                                <p className={ styles['label'] }>Vigencia de los cupones</p>
                                <div className={ styles['date-picker__content'] }>
                                    <Controller
                                        control={ control }
                                        name="couponValidityStart"
                                        render={({ field })=> (
                                            <DatePickerBox
                                                label="Inicio"
                                                fieldName="couponValidityStart"
                                                value={ field.value }
                                                onChange={ field.onChange }
                                                error={ errors.couponValidityStart }
                                                className={ styles['date-picker__date'] }
                                                isRequired
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
                                                isRequired
                                            />
                                        )}
                                        rules={{ required: 'Seleccione la fecha caducidad' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={ styles['button-container'] }>
                            <ButtonPrimary type="submit">
                                {
                                    updateCouponSettingsPage.isPending 
                                    ? ( <div className="custom-loader-white"></div> )
                                    : ( 'Guardar' )
                                }
                            </ButtonPrimary>
                        </div>
                    </form>
                )
            }
        </section>
    )
}
