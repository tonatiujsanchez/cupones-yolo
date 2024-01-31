import { FC, ReactNode } from 'react'
import Image from 'next/image'
import { SiteLayout } from '@/components'
import styles from './AuthLayout.module.scss'

interface Props {
    children: ReactNode,
    image?  : string
}
export const AuthLayout:FC<Props> = ({ children, image='/images/shopping.svg'  }) => {

    return (
        <SiteLayout>
            <main className={ styles['main-login'] }>
                <section className={styles['login-container']}>
                    <article className={styles['login-form']}>
                    {
                        children
                    }
                    </article>
                    <div className={styles['login-picture']}>
                        <Image
                            priority
                            src={ image }
                            alt="Yolo Style"
                            width={500}
                            height={500}
                        />
                    </div>
                </section>
            </main>
        </SiteLayout>
    )
}
