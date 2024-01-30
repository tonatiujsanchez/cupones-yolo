import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useConfirmAccount } from '@/hooks'
import { LoadingYolostyle, SiteLayout } from '@/components'
import { CheckCircleIcon } from '@/components/Icons'
import styles from './ConfirmAccount.module.scss'


const ConfirmAccountPage = () => {
    
    const router = useRouter()
    //FIXME: Obtener token
    const { confirmAccountMutation } = useConfirmAccount()

    useEffect(()=>{
        const { token } = router.query as { token: string }
        if( token ){
            // confirmAccountMutation.mutate({ token })
            console.log(token)            
        }
    },[router])


    if( !confirmAccountMutation.isPending ){
        return (
            <div className={ styles['loader-container'] }>
                <LoadingYolostyle />   
            </div>
        )
    }   
    
    return (
        <SiteLayout>
            <main className={ styles['confirm-account'] }>
                <div className={ styles['confirm-account__content'] }>
                    <div className={ styles['confirm-account__icon'] }>
                        <CheckCircleIcon strokeWidth={ 2 } />
                    </div>
                    <h1 className={ styles['confirm-account__title'] }>Cuenta confirmada</h1>
                    <p className={ styles['confirm-account__msg'] }>
                        Gracias por confirmar tu cuenta de <NextLink href="/" className={styles['confirm-account__link']}>Yolostyle</NextLink>. Ahora eres parte oficial de nuestra comunidad de moda. Disfruta de la exploración de las últimas tendencias, ofertas exclusivas y una experiencia de compra excepcional.
                    </p>
                    <NextLink 
                        href="/iniciar-sesion"
                        className={ styles['confirm-account__link'] }
                    >
                        Iniciar Sesión
                    </NextLink>
                </div>
            </main>
        </SiteLayout>
    )
}

export default ConfirmAccountPage