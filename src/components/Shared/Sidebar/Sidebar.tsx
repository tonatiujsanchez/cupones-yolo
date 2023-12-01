import NextLink from 'next/link'
import Image from 'next/image'
import { 
    BuildingIcon,
    CouponIcon,
    HeartIcon,
    LogoutIcon,
    PackageIcon,
    ShirtIcon,
    ShoppingCartIcon,
    TruckIcon,
    UserIcon 
} from '@/components/Icons'

import styles from './Sidebar.module.scss'


const linksAdmin = [
    {
        icon: <ShirtIcon strokeWidth={1.5} />,
        label: 'Productos',
        path: '/dashboard'
    },
    {
        icon: <TruckIcon />,
        label: 'Pedidos',
        path: '/dashboard'
    },
    {
        icon: <CouponIcon strokeWidth={1.4} />,
        label: 'Cupones',
        path: '/dashboard/cupones'
    },
]

const linksUser = [
    {
        icon: <UserIcon strokeWidth={1.7} />,
        label: 'Mi perfil',
        path: '/dashboard'
    },
    {
        icon: <ShoppingCartIcon />,
        label: 'Carrito',
        path: '/dashboard'
    },
    // {
    //     icon: <HeartIcon />,
    //     label: 'Mis favoritos',
    //     path: '/dashboard'
    // },
    // {
    //     icon: <PackageIcon />,
    //     label: 'Mis Pedidos',
    //     path: '/dashboard'
    // },
    // {
    //     icon: <BuildingIcon />,
    //     label: 'Mis direcciones',
    //     path: '/dashboard'
    // },
]



export const Sidebar = () => {
    return (
        <div className={ styles['siderbar-container'] }>
            <div className={ styles['siderbar-header'] }>
                <div className={ styles['siderbar-header__photo'] }>
                    {
                        !true
                        ?(
                            <Image
                                priority
                                fill
                                sizes="(max-width: 125px) 125px"
                                src={'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=560'}
                                alt={'Foto de usuario'}
                                title={'Foto de usuario'}
                            />
                        ):(
                            <span>
                                T
                            </span>
                        )
                    }
                </div>
                <p className={ styles['siderbar-header__name'] }>Tonatiuj Sánchez Jiménez</p>
            </div>
            <div className={ styles['siderbar-divider'] }></div>
            <ul className={ styles['siderbar-list'] }>
                {
                    linksAdmin.map( link => (
                        <li key={link.label}>
                            <NextLink 
                                href={ link.path }
                                className={`${ styles['siderbar-list__link'] } ${ link.label === 'Registros' && styles['link-active'] }`}
                            >
                                { link.icon }
                                <span>{ link.label }</span>
                            </NextLink>
                        </li>
                    ))
                }
            </ul>
            {
                linksUser.length > 0 &&
                <>
                    <div className={ styles['siderbar-divider'] }></div>
                    <ul className={ styles['siderbar-list'] }>
                        {
                            linksUser.map( link => (
                                <li key={link.label}>
                                    <NextLink 
                                        href={ link.path }
                                        className={ styles['siderbar-list__link'] }
                                    >
                                        { link.icon }
                                        <span>{ link.label }</span>
                                    </NextLink>
                                </li>
                            ))
                        }
                    </ul>
                </>
            }
            <div className={ styles['siderbar-divider'] }></div>
            <button className={ styles['siderbar__button-logout'] }>
                <LogoutIcon strokeWidth={2} />
                <span>Salir</span>
            </button>
        </div>
    )
}
