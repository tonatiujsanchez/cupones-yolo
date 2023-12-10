import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { ArrowDownIcon } from '@/components/Icons'

import styles from './CustomSelect.module.scss'

interface ISelectOption {
    value: string
    label: string
}

interface Props {
    options: ISelectOption[]
}

export const CustomSelect:FC<Props> = ({ options }) => {

    const [optionActive, setOptionActive] = useState<ISelectOption>(options[0])
    const [openOptions, setOpenOptions] = useState<boolean>(false)

    const selectRef = useRef<HTMLSelectElement>(null)


    const selectFocus = () => { setOpenOptions(true) }
    const selectBlur = () => { setOpenOptions(true) }


    useEffect(()=>{
        selectRef.current?.addEventListener('focus', selectFocus)
        selectRef.current?.addEventListener('blur', selectBlur)
        return () => {
            selectRef.current?.removeEventListener('focus', selectFocus)
            selectRef.current?.removeEventListener('blur', selectBlur)
        }
    },[])

    const hendleSelectOption = (option: ISelectOption) => {
        setOptionActive( option )
        setOpenOptions(false)
    }


    return (
        <div className={ styles['select-container'] }>
            <div>
                <select
                    ref={ selectRef }
                    className={ styles['select'] }
                >
                    <option
                        value={ optionActive.value } 
                        className={ styles['option'] }
                    >
                        { optionActive.label }
                    </option>
                    <option
                        value={ optionActive.value } 
                        className={ styles['option'] }
                    >
                        { optionActive.label }
                    </option>
                </select>
                {/* <div 
                    className={ styles['select-boxlabel'] }
                    style={{
                        display: openOptions ? 'flex' : 'none'
                    }}
                >
                    { optionActive.label }
                </div> */}
                <div className={ styles['icon-container'] }>
                    <ArrowDownIcon fill="none" />
                </div>
            </div>
            <div className={`${ styles['option-list'] } ${ openOptions ? styles['open-option-list'] : '' } `}>
                {
                    options.map( option => (
                        <div 
                            key={ option.value }
                            onClick={ ()=> hendleSelectOption( option ) }
                            className={ styles['option'] }
                        >
                            { option.label }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

