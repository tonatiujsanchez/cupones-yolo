import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CouponSection, CouponSettingsSection, CustomTabs, DashboardLayout, RegisterSection } from '@/components'
import { CouponIcon, SettingsIcon, UserGroupIcon } from '@/components/Icons'

import { GRAY_ULTRA_LIGHT_COLOR } from '@/constants'
import { ITab } from '@/interfaces'

import styles from './CouponsPage.module.scss'


export const DASHBOARD_COUPONS_PAGE_TABS:ITab[] = [
    {
        label: 'Registros',
        value: 'registros',
        icon : <UserGroupIcon strokeWidth={1.5} />,
    },
    {
        label: 'Cupones',
        value: 'cupones',
        icon : <CouponIcon strokeWidth={1.4} />,
    },
    {
        label: 'Ajustes',
        value: 'ajustes',
        icon : <SettingsIcon />,
    },
]

const CuponesAdminPage = () => {

    const [tabActive, setTabActive] = useState<ITab>(DASHBOARD_COUPONS_PAGE_TABS[1])
    
    const router = useRouter()

    useEffect(()=>{
        router.push(`?tab=${ tabActive.value }`)
    },[ tabActive ])

    const handleSetTabActive = ( currentTab: ITab ) => {
        setTabActive( currentTab )
    }

    return (
        <DashboardLayout headding="Cupones">
            <div className={`custom-scroll ${ styles['tabs-container'] }`}>
                <CustomTabs 
                    tabs={ DASHBOARD_COUPONS_PAGE_TABS }
                    value={ tabActive }
                    onChange={ handleSetTabActive }
                    bgColor={ GRAY_ULTRA_LIGHT_COLOR }
                />            
            </div>
            <div className={ styles['sections-container'] }>
                {
                    tabActive.value === 'registros' && (
                        <RegisterSection />
                    )
                }
                {
                    tabActive.value === 'cupones' && (
                        <CouponSection />
                    )
                }
                {
                    tabActive.value === 'ajustes' && (
                        <CouponSettingsSection />
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default CuponesAdminPage