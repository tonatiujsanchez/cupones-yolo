import { useRef } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { useSignUp } from '@/hooks'
import { ButtonLight, ButtonPrimary, InputText, SignUpMsgSuccess, SiteLayout } from '@/components'
import { FacebookIcon, GoogleIcon } from '@/components/Icons'
import { BLUE_FACEBOOK_COLOR } from '@/constants'
import styles from './SignUp.module.scss'


interface ISignUpFormData {
    name           : string
    email          : string
    password       : string
    confirmPassword: string
}
const SignUpPage = () => {

    const { signUpMutation, msgSuccess } = useSignUp()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignUpFormData>({
        defaultValues: {
            name           : '',
            email          : '',
            password       : '',
            confirmPassword: '',
        }
    })

    const passwordRef = useRef({})
    passwordRef.current = watch('password', '')

    const onLoginSubmit = ( data:ISignUpFormData ) => {
        signUpMutation.mutate( data )
    }
    
    return (
        <SiteLayout>
            <main className={ ` ${ styles['main-login'] }` }>
                <section className={ styles['login-container'] }>
                    {
                        msgSuccess
                        ? (
                            <SignUpMsgSuccess
                                msgSuccess={ msgSuccess }
                            />
                        ): (
                            <article className={ styles['login-form'] }>
                                <header>
                                    <h1 className={ styles['login-form__title'] }>Crear cuenta</h1>
                                </header>
                                <form 
                                    onSubmit={ handleSubmit( onLoginSubmit ) }
                                    autoComplete="off"
                                    className={ styles['login-form__content'] }
                                >
                                    <InputText
                                        autoComplete="off"
                                        type="text"
                                        label="Nombre"
                                        fieldName="name"
                                        placeholder="Ingrese su usuario"
                                        error={ errors.name }
                                        { ...register("name", {
                                            required: 'Ingrese su usuario',
                                            minLength: { value: 2, message: 'El nombre es muy corto, debe tener mínimo 2 caracteres' }
                                        })}
                                        isRequired
                                    />
                                    <InputText
                                        autoComplete="off"
                                        type="email"
                                        label="Correo"
                                        fieldName="email"
                                        placeholder="Ingrese su correo"
                                        error={ errors.email }
                                        { ...register("email", {
                                            required: 'Ingrese su contraseña'
                                        })}
                                        isRequired
                                    />
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
                                                required: 'Confirme la contraseña',
                                                validate: ( value ) => value !== passwordRef.current ? 'Las contraseñas no coinciden' : undefined
                                        })}
                                        isRequired
                                    />
                                    <div className={ styles['login-form__forgot-password'] }>
                                        <NextLink href="/restablecer-contrasena">Olvide mi contraseña</NextLink>
                                    </div>
                                    <div className={ styles['login-form__button-container'] }>       
                                        <ButtonPrimary 
                                            disabled={ signUpMutation.isPending }
                                            type="submit"
                                        >
                                            {
                                                signUpMutation.isPending
                                                ? (
                                                    <div className="custom-loader-white"></div>
                                                ):(
                                                    'Crear cuenta'
                                                )
                                            }
                                        </ButtonPrimary>
                                    </div>
                                </form>
                                <span className={ styles['login-form__divider'] }>
                                    O continuar con
                                </span>
                                <div className={styles['login-form__social-buttons']}>
                                    <ButtonLight
                                        disabled={ signUpMutation.isPending }
                                        type="button"
                                        onClick={()=>{}}
                                    >
                                        <GoogleIcon strokeWidth={ 0 } /> Google
                                    </ButtonLight>
                                    <ButtonLight
                                        disabled={ signUpMutation.isPending }
                                        type="button"
                                        onClick={()=>{}}
                                    >
                                        <FacebookIcon fill={ BLUE_FACEBOOK_COLOR } /> Facebook
                                    </ButtonLight>
                                </div>
                                <p className={styles['login-form__login-link']}>¿Ya tienes una cuenta? <NextLink href="/iniciar-sesion">Inicia Sesión</NextLink></p>
                            </article>
                        )
                    }
                    <div className={ styles['login-picture'] }>
                        <Image
                            priority
                            src={'/images/shopping.svg'}
                            alt="Yolo Style"
                            width={500}
                            height={500}
                        />
                    </div>
                </section>
            </main>
        </SiteLayout>
    )
}

export default SignUpPage
