import { GetServerSideProps, NextPage } from 'next'
import { CouponsForm, SiteLayout } from "@/components"
import { coupons } from "@/database"

import styles from './CouponsPage.module.scss'

interface Props {
    pageTitle          : string
    pageSubtitle?      : string
    dateToRegisterStart: Date
    dateToRegisterEnd  : Date
    backgroundImage    : string
}
const CouponsPage:NextPage<Props> = ({ pageTitle, pageSubtitle, dateToRegisterStart, dateToRegisterEnd, backgroundImage }) => {

    return (
        <SiteLayout>
            <main className={ styles['main-coupons'] }>
                <CouponsForm
                    pageTitle={ pageTitle }
                    pageSubtitle={ pageSubtitle }
                    dateToRegisterStart={ dateToRegisterStart }
                    dateToRegisterEnd={ dateToRegisterEnd }
                    backgroundImage={ backgroundImage }
                />
            </main>
        </SiteLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {

    const couponSettingsPage = await coupons.useGetCouponSettingsPage()
    
    if( !couponSettingsPage ){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            ...couponSettingsPage
        }
    }
}

export default CouponsPage