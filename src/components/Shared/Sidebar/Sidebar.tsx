import Image from 'next/image'
import { useAuth } from '@/hooks'
import { SideLink } from '@/components'
import { 
    BuildingIcon,
    CategoryIcon,
    CogIcon,
    CouponIcon,
    HashtagIcon,
    HeartIcon,
    LayerIcon,
    LogoutIcon,
    PackageIcon,
    SectionIcon,
    ShieldIcon,
    ShirtIcon,
    ShoppingBagOutlineIcon,
    ShoppingCartIcon,
    TruckIcon,
    UserIcon 
} from '@/components/Icons'
import { ISideLink } from '@/interfaces'
import styles from './Sidebar.module.scss'
import { USER_ROLES } from '@/constants'



const sideLinksSuperAdmin:ISideLink[] = [
    {
        icon: <ShieldIcon />,
        label: 'Usuarios',
        path: '/dashboard/usuarios'
    },
]

const sideLinksAdmin:ISideLink[] = [
    {
        icon: <LayerIcon />,
        label: 'Dashboard',
        path: '/dashboard'
    },
    {
        icon: <ShirtIcon />,
        label: 'Productos',
        path: '/dashboard/productos'
    },
    {
        icon: <TruckIcon />,
        label: 'Pedidos',
        path: '/dashboard/pedidos'
    },
    {
        icon: <CouponIcon strokeWidth={1.4} />,
        label: 'Cupones',
        path: '/dashboard/cupones'
    },
    {
        icon: <CogIcon />,
        label: 'Ajustes',
        path: '/dashboard/ajustes',
        subLinks: [
            {
                icon: <CategoryIcon />,
                label: 'Categorías',
                path: '/dashboard/ajustes/categorias'
            },
            {
                icon: <SectionIcon />,
                label: 'Secciones',
                path: '/dashboard/ajustes/secciones'
            },
            {
                icon: <HashtagIcon />,
                label: 'Tallas',
                path: '/dashboard/ajustes/tallas'
            },
            {
                icon: <ShoppingBagOutlineIcon />,
                label: 'Marcas',
                path: '/dashboard/ajustes/marcas'
            },
        ]
    },
]

const sideLinksUser = [
    {
        icon: <UserIcon strokeWidth={1.7} />,
        label: 'Mi perfil',
        path: '/dashboard/perfil'
    },
    {
        icon: <ShoppingCartIcon />,
        label: 'Carrito',
        path: '/dashboard/carrito'
    },
    {
        icon: <HeartIcon />,
        label: 'Mis favoritos',
        path: '/dashboard/mis-favoritos'
    },
    {
        icon: <PackageIcon />,
        label: 'Mis Pedidos',
        path: '/dashboard/mis-pedidos'
    },
    {
        icon: <BuildingIcon />,
        label: 'Mis direcciones',
        path: '/dashboard/mis-direcciones'
    },
]



export const Sidebar = () => {

    const { user, logout } = useAuth()

    return (
        <div className={ styles['siderbar-container'] }>
            <div className={ styles['siderbar-header'] }>
                <div className={ styles['siderbar-header__photo'] }>
                    {
                        user?.photo
                        ?(
                            <Image
                                priority
                                fill
                                sizes="(max-width: 125px) 125px"
                                src={ user.photo }
                                alt={`Foto de ${ user.name }`}
                                title={`Foto de ${ user.name }`}
                            />
                        ):(
                            <span>
                                { user?.name.slice(0, 1) }
                            </span>
                        )
                    }
                </div>
                <p className={ styles['siderbar-header__name'] }>{ user?.name }<span>@{ user?.username }</span></p>
            </div>
            {   ( user?.role === USER_ROLES.admin || user?.role === USER_ROLES.superAdmin ) &&
                <>
                    <div className={ styles['siderbar-divider'] }></div>
                    <ul className={ styles['siderbar-list'] }>
                        {
                            sideLinksAdmin.map( sideLink => (
                                <SideLink key={ sideLink.path } sideLink={ sideLink } />
                            ))
                        }
                        {
                            user?.role === USER_ROLES.superAdmin &&
                            sideLinksSuperAdmin.map( sideLink => (
                                <SideLink key={ sideLink.path } sideLink={ sideLink } />
                            ))
                        }
                    </ul>
                </>
            }
            <div className={ styles['siderbar-divider'] }></div>
            <ul className={ styles['siderbar-list'] }>
                
                {
                    sideLinksUser.map( sideLink => (
                        <SideLink key={ sideLink.label } sideLink={ sideLink } />
                    ))
                }
            </ul>
            <div className={ styles['siderbar-divider'] }></div>
            <button
                onClick={ logout } 
                className={ styles['siderbar__button-logout'] }
            >
                <LogoutIcon strokeWidth={2} />
                <span>Salir</span>
            </button>
        </div>
    )
}
