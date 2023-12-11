import { FC, useEffect, useRef, useState } from 'react'
import { ArrowDownIcon } from '@/components/Icons'

import { ISelectOption } from '@/interfaces'
import styles from './CustomSelect.module.scss'


interface Props {
    options: ISelectOption[]
    onChange: ( option:ISelectOption )=> void
}

export const CustomSelect:FC<Props> = ({ options, onChange }) => {

    const [optionSelected, setOptionSelected] = useState<ISelectOption>(options[0])
    const [openOptions, setOpenOptions] = useState<boolean>(false)

    const divRef = useRef<HTMLDivElement>(null)

    const handleOutsideClick = (ev:MouseEvent) => {
        if( ev.target !== divRef.current ){
            setOpenOptions(false)
        }
    }

    useEffect(()=>{
        const body = document.querySelector('body')
        body?.addEventListener('click', handleOutsideClick )

        return () => {
            body?.removeEventListener('click', handleOutsideClick)
        }
    },[])

    const handleToggleOptions = () => {
        setOpenOptions( !openOptions )
    }

    const hendleSelectOption = (option: ISelectOption) => {
        setOptionSelected( option )
        onChange( option )
    }


    return (
        <div className={`${ styles['select-container'] } ${ openOptions ? styles['select-container-focus'] : '' }`} >
            <div 
                onClick={ handleToggleOptions }
                ref={ divRef }
                className={ `${ styles['select'] } ${ openOptions ? styles['select-focus']:'' }` } >
                
                { optionSelected.label }

                <div className={ styles['icon-container'] }>
                    <ArrowDownIcon fill="none" />
                </div>
            </div>
            <ul 
                className={`${ styles['option-list'] } ${ openOptions ? styles['open-option-list'] : '' } `}
            >
                {
                    options.map( option => (
                        <li 
                            key={ option.value }
                            onClick={ ()=> hendleSelectOption( option ) }
                            className={`${ styles['option'] } ${ option.value === optionSelected.value ? styles['option-selected'] : ''} `}
                        >
                            { option.label }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

