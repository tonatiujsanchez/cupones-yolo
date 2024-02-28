import { FC, useEffect, useRef, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { CheckIcon, XIcon } from '@/components/Icons'
import { includesOptionSelect } from '@/utils'
import { ISelectOption } from '@/interfaces'

import styles from './CustomSelectMultiple.module.scss'


const isDescendant = (element: Node | null, parent: HTMLElement | null): boolean => {
    if (!element) return false;

    if (element === parent) return true;

    return isDescendant(element.parentNode, parent);
}

interface Props {
    optionsSelected: ISelectOption[]
    options     : ISelectOption[]
    onChange    : ( value:ISelectOption )=> void
    label       : string
    fieldName   : string
    placeholder?: string
    error?      : Merge<FieldError, Merge<FieldError, FieldErrorsImpl<ISelectOption[]>>>
    isRequired? : boolean
}
export const CustomSelectMultiple:FC<Props> = ({ optionsSelected, options, onChange, label, fieldName, placeholder="Elegir...", error, isRequired }) => {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentOptions, setCurrentOptions] = useState<ISelectOption[]>([])
    const [openOptions, setOpenOptions] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const divSelectContainerRef = useRef<HTMLDivElement>(null)

    const onShowOptions = () => {
        inputRef.current?.focus()
        divSelectContainerRef.current?.classList.add(styles['select-container__focus'])
        setOpenOptions(true)
    }

    const onHiddenOptions = () => {
        setOpenOptions(false)
        setSearchTerm('')
        divSelectContainerRef.current?.classList.remove(styles['select-container__focus'])

    }

    const handleOutsideClick = (ev:MouseEvent) => {
        if( 
            ev.target !== divSelectContainerRef.current &&
            !isDescendant(ev.target as Node, divSelectContainerRef.current)
        ){
            onHiddenOptions()
        }
    }

    useEffect(()=>{

        const body = document.querySelector('body')
        body?.addEventListener('click', handleOutsideClick )
        inputRef.current?.addEventListener('focus', onShowOptions)

        return () => {
            body?.removeEventListener('click', handleOutsideClick)
            inputRef.current?.removeEventListener('focus', onShowOptions)
        }
    },[])

    useEffect(()=>{

        if(searchTerm.trim() === ''){
            setCurrentOptions(options)
        }else {
            const optionsByTerm = options.filter( option => option.label.toLowerCase().includes(searchTerm.trim().toLowerCase()) )
            setCurrentOptions(optionsByTerm)
        }

    },[searchTerm])


    const handleSelectOption = (option: ISelectOption) => {
        onChange(option)
        onHiddenOptions()
        setSearchTerm('')
    }



    return (
        <div className={`${ styles['select'] }`}>
            <label 
                htmlFor={ fieldName }
                className="input-label"
            >
                { label }{ isRequired && <span className="required-asterisk">*</span> }
            </label>
            <div ref={ divSelectContainerRef } >
                <ul 
                    className={ styles['select-content'] }
                    onClick={ onShowOptions }
                >
                    {
                        optionsSelected.map( optionSelected => (
                            <li
                                key={ optionSelected.value }
                                className={ styles['select-content__item'] }
                            >
                                <button
                                    type="button"
                                    onClick={ ()=> handleSelectOption( optionSelected ) }
                                >
                                        <XIcon />
                                </button>
                                <span onClick={ onShowOptions }>
                                    { optionSelected.label }
                                </span>
                            </li>
                        ))
                    }
                    <li className={ styles['select-content__input-content'] }>
                        <input
                            type="text"
                            autoComplete="off"
                            id={ fieldName }
                            ref={ inputRef }
                            name="searchTerm"
                            value={ searchTerm }
                            onChange={ ({ target })=> setSearchTerm( target.value )}
                            placeholder={ optionsSelected.length === 0 ? placeholder : ''}
                            className={styles['select-content__input']}
                        />
                    </li>
                </ul>
                <ul 
                    className={`${ styles['select-list-options'] } ${ openOptions ? styles['select-list-options__open'] : '' } `}
                >
                    {
                        currentOptions.map( option => (
                            <li 
                                key={ option.value }
                                onClick={ ()=> handleSelectOption( option ) }
                                className={`${ styles['option'] } ${ includesOptionSelect( option, optionsSelected ) ? styles['option-added'] : ''} `}
                            >
                                <div className={ styles['option__icon'] }>
                                    <CheckIcon />
                                </div>
                                <span>
                                    { option.label }
                                </span>
                            </li>
                        ))
                    }
                    {
                        currentOptions.length === 0 && (
                            <li className={ styles['option__no-result'] }>
                                Sin resultados
                            </li>
                        )
                    }
                </ul>
                {
                    error &&
                    <span className={styles['error-message']}>{error.message}</span>
                }
            </div>
        </div>
    )
}
