
import { CouponsForm, SiteLayout } from "@/components"

import styles from './Cupones.module.scss'

const CouponsPage = () => {

    return (
        <SiteLayout>
            <main className={ styles['main-coupons'] }>
                <CouponsForm />
            </main>
        </SiteLayout>
    )
}

export default CouponsPage