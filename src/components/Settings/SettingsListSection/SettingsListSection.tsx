import { FC, ReactNode } from 'react'
import { ButtonPrimary } from '@/components'
import { PlusCircleIcon } from '@/components/Icons'

import styles from './SettingsListSection.module.scss'

interface Props {
    children: ReactNode
    title: string
    onClick: ()=> void
}
export const SettingsListSection:FC<Props> = ({ children, title, onClick }) => {
    
    return (
        <>
            <section className={styles['settings-section']}>
                <div className={styles['settings-section__header']}>
                    <h3>{ title }</h3>
                    <ButtonPrimary
                        onClick={ onClick }
                    >
                        <PlusCircleIcon />
                    </ButtonPrimary>
                </div>
                <div>
                    { children }
                </div>
            </section>
        </>
    )
}
