import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'

import styles from './Navbar.module.scss'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components'


export const Navbar = () => {

    const router = useRouter()
    const { asPath } = router
    

    return (
        <header>
            <div className={`container ${styles['navbar-container']}`}>
                <div className={`${styles['navbar-content']}`}>
                    <NextLink href={'/'}>
                        <Image
                            width={100}
                            height={40}
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`}
                            alt="Logo de Yolostyle"
                            title="Logo de Yolostyle"
                            className={ styles['navbar-logo'] }
                        />
                    </NextLink>
                    <nav className={styles.navbar}>
                        <NextLink 
                            href={'/'} 
                            className={`${styles['nav-link']} ${asPath === '/' ? styles.active : ''}`}
                        >
                            Inicio
                        </NextLink>
                        <NextLink 
                            href={'/'} 
                            className={`${styles['nav-link']} ${asPath === '/tienda' ? styles.active : ''}`}
                        >
                            Tienda
                        </NextLink>
                        <NextLink 
                            href={'/cupones'} 
                            className={`${styles['nav-link']} ${asPath === '/cupones' ? styles.active : ''}`}
                        >
                            Cupones
                        </NextLink>
                    </nav>
                </div>
                <div className={ styles.social }>
                    <a
                        href={'https://www.facebook.com/yolostylemx'}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <FacebookIcon />
                    </a>
                    <a
                        href={'https://www.instagram.com/yolostylemx'}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <InstagramIcon />
                    </a>
                    <a
                        href={'https://wa.me/7571343567'}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <WhatsAppIcon />
                    </a>
                </div>
            </div>
        </header>
    )
}
