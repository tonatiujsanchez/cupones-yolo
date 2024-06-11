import NextLink from 'next/link'
import { DashboardLayout } from '@/components'
import styles from './Settings.module.scss'
import { CategoryIcon } from '@/components/Icons'
import { SectionIcon, HashtagIcon, ShoppingBagOutlineIcon } from '../../../components/Icons/Icons';

const SettingsPage = () => {

    return (
        <DashboardLayout headding="Ajustes">
            <nav className={ styles['settings__nav'] }>
                <NextLink 
                    href={'/dashboard/ajustes/categorias'}
                    className={`${ styles['settings__navlink'] }`}
                >
                        <CategoryIcon />
                        <span>Categorías</span>
                </NextLink>
                <NextLink 
                    href={'/dashboard/ajustes/secciones'}
                    className={`${ styles['settings__navlink'] }`}
                >
                        <SectionIcon />
                        <span>Secciones</span>
                </NextLink>
                <NextLink 
                    href={'/dashboard/ajustes/tallas'}
                    className={`${ styles['settings__navlink'] }`}
                >
                        <HashtagIcon />
                        <span>Tallas</span>
                </NextLink>
                <NextLink 
                    href={'/dashboard/ajustes/marcas'}
                    className={`${ styles['settings__navlink'] }`}
                >
                        <ShoppingBagOutlineIcon />
                        <span>Marcas</span>
                </NextLink>
            </nav>
        </DashboardLayout>
    )
}

export default SettingsPage
