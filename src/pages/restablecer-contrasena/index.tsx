import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useResetPassword } from '@/hooks'
import { AuthLayout, ButtonPrimary, InputText } from '@/components'
import { isValidEmail } from '@/utils'
import styles from './ResetPassword.module.scss'


interface IResetPasswordFormData {
    email: string
}
const ResetPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IResetPasswordFormData>({
        defaultValues: {
            email: '',
        }
    })

    const { resetPasswordMutation, msg } = useResetPassword()

    const onResetPassword = ({ email }:IResetPasswordFormData) => {
        resetPasswordMutation.mutate({ email })       
    }

    
    return (
        <AuthLayout>
            <div className={ styles['form-container'] }>
                <h1>Recuperar contraseña</h1>
                <p className={ styles['form-container__description'] }>Ingresa tu correo y te enviaremos un enlace para restablecer su contraseña</p>
                <form
                    onSubmit={ handleSubmit( onResetPassword ) } 
                    className={ styles['form'] }
                >
                    <InputText
                        autoComplete="off"
                        type="email"
                        label="Correo"
                        fieldName="email"
                        placeholder="Ingrese su contraseña"
                        error={ errors.email }
                        { ...register("email", {
                            required: 'Ingrese su correo',
                            validate: ( value ) => isValidEmail(value) ? undefined : 'Correo no válido'
                        })}
                        isRequired
                    />
                    <div className={ styles['login-form__button-container'] }>       
                        <ButtonPrimary 
                            disabled={ resetPasswordMutation.isPending }
                            type="submit"
                        >
                            {
                                resetPasswordMutation.isPending
                                ? (
                                    <div className="custom-loader-white"></div>
                                ):(
                                    'Enviar'
                                    )
                            }
                        </ButtonPrimary>
                    </div>
                </form>
                <div className={ styles['login-form__links'] }>
                    <div className={ styles['login-form__link'] }>
                        <NextLink href="/iniciar-sesion">Iniciar Sesión</NextLink>
                    </div>
                    <div className={ styles['login-form__link'] }>
                        <NextLink href="/crear-cuenta">Crear Cuenta</NextLink>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default ResetPassword