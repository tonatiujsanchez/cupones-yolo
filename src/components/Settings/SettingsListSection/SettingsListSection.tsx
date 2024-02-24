import { FC, ReactNode } from 'react'
import { ButtonPrimary, ButtonRefresh } from '@/components'
import { PlusCircleIcon } from '@/components/Icons'

import styles from './SettingsListSection.module.scss'

interface Props {
    children: ReactNode
    title: string
    onClick: ()=> void
    onClickRefresh: ()=> void
}
export const SettingsListSection:FC<Props> = ({ children, title, onClick, onClickRefresh }) => {
    
    return (
        <>
            <section className={styles['settings-section']}>
                <div className={styles['settings-section__header']}>
                    <div className={ styles['settings-section__title-container'] }>
                        <h3>{ title }</h3>
                        <ButtonRefresh
                            onClick={ onClickRefresh }
                        />
                    </div>
                    <ButtonPrimary
                        onClick={ onClick }
                        className={ styles['settings-section__add-button'] }
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
