import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { IDropdownOption } from '@/interfaces'

import styles from './Dropdown.module.scss'


interface Props {
    children: ReactNode
    options : IDropdownOption[]
}
export const Dropdown:FC<Props> = ({ children, options }) => {

    const [openOptions, setOpenOptions] = useState<boolean>(false)
    const divRef = useRef<HTMLButtonElement>(null)

    const handleOutsideClick = (ev:MouseEvent) => {
        if( ev.target !== divRef.current && (ev.target as HTMLDivElement).parentNode !== divRef.current ){
            setOpenOptions(false)
        }
    }

    const handleToggleOptions = () => {
        setOpenOptions( !openOptions )
    }

    useEffect(()=>{
        const body = document.querySelector('body')
        body?.addEventListener('click', handleOutsideClick )

        return () => {
            body?.removeEventListener('click', handleOutsideClick)
        }
    },[])


    return (
        <div className={ styles['dropdown'] }>
            <button
                type="button"
                onClick={ handleToggleOptions }
                ref={ divRef }
                className={ styles['dropdown__button'] }
            >
                { children }
            </button>
            <ul
                className={`${ styles['dropdown__options'] } ${ openOptions ? styles['dropdown__options-open'] : '' } `}
            >
                {
                    options.map( option => (
                        <li 
                            key={ option.label }
                            onClick={ option.action }
                            className={ styles['dropdown__option'] }
                        >
                            { option.label }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
