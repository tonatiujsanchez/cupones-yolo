import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import { Overlay } from '@/components'
import { FacebookIcon, InstagramIcon, MunuIcon, WhatsAppIcon } from '@/components/Icons'

import styles from './Navbar.module.scss'



export const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)
    const headerRef = useRef<HTMLElement>(null)

    const router = useRouter()
    const { asPath } = router

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
                <button
                    onClick={ ()=> setShowMenu(true) }
                    className={ styles['menu-button'] }
                >
                    <MunuIcon />
                </button>
            </div>
        </header>
    )
}
