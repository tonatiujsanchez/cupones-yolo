import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { AuthLayout, ButtonPrimary, InputText, LoadingYolostyle } from '@/components'
import { useCheckPasswordToken } from '@/hooks'
import styles from './ResetPasswordToken.module.scss'

interface IResetPasswordToken {
    password       : string
    confirmPassword: string
}
const ResetPasswordToken = () => {

    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IResetPasswordToken>({
        defaultValues: {
            password       : '',
            confirmPassword: ''
        }
    })

    const { checkPasswordTokenMutation, msgSuccess } = useCheckPasswordToken()


    // Hacer petición para validar token
    useEffect(()=>{
        const { token } = router.query as { token: string }
        if( token ){
            checkPasswordTokenMutation.mutate({ token })         
        }
    },[router])



    const passwordRef = useRef({})
    passwordRef.current = watch('password', '')

    const onResetPassword = (data: IResetPasswordToken) => {
        console.log(data)
        // TODO: Enviar y guardar la nueva contraseña
    }

    if( checkPasswordTokenMutation.isPending || !msgSuccess ){
        return (
            <div className={ styles['loader-container'] }>
                <LoadingYolostyle />   
            </div>
        )
    }   

    return (
        <AuthLayout>
            <div className={ styles['form-container'] }>
                <h1>Nueva contraseña</h1>
                <p className={ styles['form-container__description'] }> <strong>¡Hola { msgSuccess } 👋!</strong>, que bueno tenerte de vuelta, por favor, ingresa tu nueva contraseña y presiona en guardar para recuperar tu acceso a <strong>Yolostyle</strong></p>
                <form
                    onSubmit={ handleSubmit( onResetPassword ) }
                    className={ styles['form'] }
                >
                    <InputText
                        autoComplete="off"
                        type="password"
                        label="Contraseña"
                        fieldName="password"
                        placeholder="Ingrese su contraseña"
                        error={ errors.password }
                        { ...register("password", {
                                required: 'Ingrese una contraseña',
                                minLength: { value: 6, message: 'La contraseña es muy corta, ingrese mínimo 6 caracteres' }
                        })}
                        isRequired
                    />
                    <InputText
                        type="password"
                        label="Confirme su contraseña"
                        fieldName="confirmPassword"
                        placeholder="Confirme su contraseña"
                        error={ errors.confirmPassword }
                        { ...register("confirmPassword", {
                                required: 'Confirme su contraseña',
                                validate: ( value ) => value !== passwordRef.current ? 'Las contraseñas no coinciden' : undefined
                        })}
                        isRequired
                    />
                    <div className={ styles['login-form__button-container'] }>       
                        <ButtonPrimary 
                            // disabled={ changePasswordMutation.isPending }
                            type="submit"
                        >
                            {
                                // changePasswordMutation.isPending
                                false
                                ? (
                                    <div className="custom-loader-white"></div>
                                ):(
                                    'Guardar'
                                    )
                            }
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}

export default ResetPasswordToken