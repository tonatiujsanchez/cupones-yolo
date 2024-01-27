import { useRef } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { fonts } from '@/fonts'

import { ButtonLight, ButtonPrimary, InputText, SiteLayout } from '@/components'
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
        console.log( data )
    }
    
    return (
        <SiteLayout>
            <main className={ `${ fonts.Raleway.className }  ${ styles['main-login'] }` }>
                <section className={ styles['login-container'] }>
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
                                    required: 'Ingrese su usuario'
                                })}
                                isRequired
                            />
                            <InputText
                                autoComplete="off"
                                type="email"
                                label="Correo"
                                fieldName="email"
                                placeholder="Ingrese su contraseña"
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
                                <NextLink href="/olvide-password">Olvide mi contraseña</NextLink>
                            </div>
                            <div className={ styles['login-form__button-container'] }>       
                                <ButtonPrimary type="submit" >
                                    Crear cuenta
                                </ButtonPrimary>
                            </div>
                        </form>
                        <span className={ styles['login-form__divider'] }>
                            O continuar con
                        </span>
                        <div className={styles['login-form__social-buttons']}>
                            <ButtonLight
                                type="button"
                                onClick={()=>{}}
                            >
                                <GoogleIcon strokeWidth={ 0 } /> Google
                            </ButtonLight>
                            <ButtonLight
                                type="button"
                                onClick={()=>{}}
                            >
                                <FacebookIcon fill={ BLUE_FACEBOOK_COLOR } /> Facebook
                            </ButtonLight>
                        </div>
                        <p className={styles['login-form__login-link']}>¿Ya tienes una cuenta? <NextLink href="/iniciar-sesion">Inicia Sesión</NextLink></p>
                    </article>
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
