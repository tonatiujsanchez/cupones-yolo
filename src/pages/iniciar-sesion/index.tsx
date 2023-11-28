import Image from "next/image"
import NextLink from 'next/link'
import { useForm } from "react-hook-form"

import { Raleway } from "next/font/google"
const RalewayFont = Raleway({
    weight: ['300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})

import { ButtonPrimary, InputText } from "@/components"
import styles from './LoginPage.module.scss'


interface LoginFormData {
    user    : string
    password: string
}

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        defaultValues: {
            user: '',
            password: ''
        }
    })

    const onLoginSubmit = ( data:LoginFormData ) => {
        console.log( data )
    }

    return (
        <main className={ `${ RalewayFont.className }  ${ styles['main-login'] }` }>
            <section className={ styles['login-container'] }>
                <article className={ styles['login-form'] }>
                    <header>
                        <NextLink
                            href={'/'}
                        >
                            <Image
                                width={130}
                                height={50}
                                src={`/images/logo-con-slogan.svg`}
                                alt="Logo de Yolostyle"
                                title="Logo de Yolostyle"
                                className={ styles['login-form__logo'] }
                            />
                        </NextLink>
                        <h1 className={ styles['login-form__title'] }>Inicia Sesión</h1>
                    </header>
                    <form 
                        onSubmit={ handleSubmit( onLoginSubmit ) }
                        className={ styles['login-form__content'] }
                    >
                        <InputText
                            type="text"
                            label="Usuario"
                            fieldName="user"
                            placeholder="Ingrese su usuario"
                            error={ errors.user }
                            { ...register("user", {
                                required: 'Ingrese su usuario'
                            })}
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
                        />
                        <div className={ styles['login-form__button-container'] }>       
                            <ButtonPrimary type="submit" >
                                Iniciar Sesión
                            </ButtonPrimary>
                        </div>
                    </form>
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
    )
}

export default LoginPage
