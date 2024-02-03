import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import { useAuth, useGetPublicRoutes } from '@/hooks'
import { Overlay } from '@/components'
import { FacebookIcon, HeartIcon, InstagramIcon, MunuIcon, SearchIcon, ShoppingCartIcon, UserCircleIcon, WhatsAppIcon } from '@/components/Icons'

import styles from './Navbar.module.scss'



export const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)
    const headerRef = useRef<HTMLElement>(null)

    const router = useRouter()
    const { asPath } = router

    
    const { routesQuery } = useGetPublicRoutes()
    const { user } = useAuth()

    const scrollEvent = () => {
        const navbarContainer = headerRef.current
        if (window.scrollY > 20) {
            navbarContainer?.classList.add(styles['scroll-active'])
        } else {
            navbarContainer?.classList.remove(styles['scroll-active'])
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', scrollEvent)
        return () => {
            window.removeEventListener('scroll', scrollEvent )
        }
    },[])

    
    return (
        <header 
            ref={ headerRef } 
            className={styles['header']}
        >
            <div className={`container ${styles['navbar-container']}`} >
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
                { showMenu && (
                    <Overlay onClick={ ()=> setShowMenu(false) } />
                )}
                <div className={`${styles['navbar-content']} ${ showMenu ? styles['show-menu'] : '' }`} >
                    <nav className={styles.navbar}>
                        {/* <NextLink 
                            href={'/dashboard'} 
                            className={`${ styles['nav-link'] } ${styles['nav-link__my-account'] } ${ asPath === '/dashboard' ? styles.active : ''}`}
                        >
                            My cuenta
                        </NextLink> */}
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
                        {
                            !routesQuery.isLoading && routesQuery.data 
                            && (
                                routesQuery.data.map( route => (
                                <NextLink 
                                    key={ route.slug }
                                    href={`/${ route.slug }`} 
                                    className={`${styles['nav-link']} ${asPath === `/${ route.slug }` ? styles.active : ''}`}
                                >
                                    { route.title }
                                </NextLink>
                                ))
                            )
                        }
                        <NextLink 
                            href={'/iniciar-sesion'} 
                            className={`${styles['nav-link']} ${ styles['nav-link__login'] } ${ asPath === '/iniciar-sesion' || asPath === '/crear-cuenta' ? styles.active : ''}`}
                        >
                            Ingresar
                        </NextLink>
                    </nav>
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
                <div className={ styles['menu-button__container'] }>
                    <button
                        className={`${ styles['menu-button'] } ${ styles['search-button'] }` }
                    >
                        <SearchIcon />
                    </button>
                    {
                        user && (
                            <button
                                className={`${ styles['menu-button'] } ${ styles['favorites-button'] }` }
                            >
                                <HeartIcon />
                            </button>
                        )
                    }
                    <button
                        className={`${ styles['menu-button'] } ${ styles['cart-button'] }`}
                    >
                        <ShoppingCartIcon />
                    </button>

                    {
                        user
                        ?(
                            <NextLink
                                className={`${ styles['menu-button'] } ${ styles['login-user'] } `} 
                                href={'/dashboard'}
                            >
                                <div>
                                    { user.name.slice(0, 1) }
                                </div>
                            </NextLink>
                        ):(
                            <NextLink
                                className={`${ styles['menu-button'] } ${ styles['login-link'] } `} 
                                href={'/iniciar-sesion'}
                            >
                                <UserCircleIcon />
                            </NextLink>
                        )
                    }
                    <button
                        onClick={ ()=> setShowMenu(true) }
                        className={ styles['menu-button'] }
                    >
                        <MunuIcon />
                    </button>
                </div>
            </div>
        </header>
    )
}
