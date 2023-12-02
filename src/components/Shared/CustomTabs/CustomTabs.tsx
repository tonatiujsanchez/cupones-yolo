import { FC } from 'react'

import { ITab } from '@/interfaces'
import styles from './CustomTabs.module.scss'
import { WHITE_COLOR } from '../../../constants'

interface Props {
    tabs    : ITab[]
    value   : ITab
    onChange: ( value: ITab ) => void
    bgColor?: string
}

export const CustomTabs:FC<Props> = ({ tabs, value, onChange, bgColor = WHITE_COLOR }) => {

    return (
        <ul
            role="tablist"
            className={ styles['tabs-list'] }
            style={{
                backgroundColor: bgColor
            }}
        >
            {
                tabs.map( tab => (
                    <li
                        key={ tab.value }
                        className={ styles['tabs-item'] }
                    > 
                        <button
                            onClick={()=> onChange( tab )} 
                            className={`${styles['tabs-button']} ${ tab.value === value.value && styles['tab-active'] }`}
                        >
                            { tab.icon && tab.icon }
                            <span>{ tab.label }</span>
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}
