import { Dancing_Script } from "next/font/google"
const DancingScriptFont = Dancing_Script({
    weight: ['700'],
    style: ['normal'],
    subsets: ['latin']
})

import styles from './CouponsSection.module.scss'

export const CouponsSection = () => {
    return (
        <section className={`${styles['coupons-container']}`}>
            <h2 className={ styles['title-section'] }>
                <span>¡Celebra tu</span>
                <span className={`${DancingScriptFont.className}`}>cumpleaños</span>
                <span>a lo grande!</span>
            </h2>
        </section>
    )
}
