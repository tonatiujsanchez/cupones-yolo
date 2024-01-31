import Image from 'next/image'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { fonts } from '@/fonts'
import { ButtonLight, ButtonPrimary, InputText, SiteLayout } from '@/components'
import { FacebookIcon, GoogleIcon } from '@/components/Icons'
import { BLUE_FACEBOOK_COLOR } from '@/constants'
import styles from './LoginPage.module.scss'


interface ILoginFormData {
    user    : string
    password: string
}

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>({
        defaultValues: {
            user: '',
            password: ''
        }
    })

    const onLoginSubmit = ( data:ILoginFormData ) => {
        console.log( data )
    }
    
    return (
        <SiteLayout>
            <main className={ `${ fonts.Raleway.className }  ${ styles['main-login'] }` }>
                <section className={ styles['login-container'] }>
                    <article className={ styles['login-form'] }>
                        <header>
                            <h1 className={ styles['login-form__title'] }>Inicia Sesión</h1>
                        </header>
                        <form 
                            onSubmit={ handleSubmit( onLoginSubmit ) }
                            className={ styles['login-form__content'] }
                        >
                            <InputText
                                type="text"
                                label="Correo/Username"
                                fieldName="user"
                                placeholder="Ingrese su correo o username"
                                error={ errors.user }
                                { ...register("user", {
                                    required: 'Ingrese su usuario o username'
                                })}
                                isRequired
                            />
                            <InputText
                                type="password"
                                label="Contraseña"
                                fieldName="password"
                                placeholder="Ingrese su contraseña"
                                error={ errors.password }
                                { ...register("password", {
                                        required: 'Ingrese su contraseña'
                                })}
                                isRequired
                            />
                            <div className={ styles['login-form__forgot-password'] }>
                                <NextLink href="/restablecer-contrasena">Olvide mi contraseña</NextLink>
                            </div>
                            <div className={ styles['login-form__button-container'] }>       
                                <ButtonPrimary type="submit" >
                                    Iniciar Sesión
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
                        <p className={styles['login-form__login-link']}>¿Aun no tienes una cuenta? <NextLink href="/crear-cuenta">Regístrate</NextLink></p>
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

export default LoginPage
