import { FC, useEffect, useRef, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { XIcon } from '@/components/Icons'

import styles from './InputTags.module.scss'

interface Props {
    tags        : string[]
    onChange    : ( value:string[] )=> void
    label       : string
    fieldName   : string
    placeholder?: string
    error?      : Merge<FieldError, Merge<FieldError, FieldErrorsImpl<string[]>>>
    isRequired? : boolean
}
export const InputTags:FC<Props> = ({ tags, onChange, label, fieldName, placeholder, error, isRequired }) => {
    
    const [inputText, setInputText] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const divInputTagsContainerRef = useRef<HTMLUListElement>(null)


    const onFocus = () => {
        divInputTagsContainerRef.current?.classList.add(styles['tags__list-focus'])
    }

    const onBlur = () => {
        divInputTagsContainerRef.current?.classList.remove(styles['tags__list-focus'])
    }


    useEffect(()=>{
        inputRef.current?.addEventListener('focus', onFocus)
        inputRef.current?.addEventListener('blur', onBlur)
        return () => {
            inputRef.current?.removeEventListener('focus', onFocus)
            inputRef.current?.removeEventListener('blur', onBlur)
        }
    },[])

    const onRemoveTag = (tag:string) => {
        const currentTags = tags

        if (currentTags.includes(tag)) {
            const sizesTags = currentTags.filter(t => t !== tag)
            onChange(sizesTags)
        }
    }

    
    const onAddNewTag = () => {

        const newTag = inputText.slice(0, -1).trim().toLocaleLowerCase()

        if (newTag.trim() === '') { return setInputText('') }

        const currentTags = tags

        if (currentTags.includes(newTag)) { return setInputText('') }

        onChange( [...currentTags, newTag] )
        setInputText('')

    }


    return (
        <div className={ styles['input-tags'] }>
            <label 
                htmlFor={ fieldName }
                className="input-label"
            >
                { label }{ isRequired && <span className="required-asterisk">*</span> }
            </label>
            <ul
                ref={ divInputTagsContainerRef } 
                className={ styles['tags__list'] }
            >
                {
                    tags.map( tag => (
                        <li
                            key={ tag }
                            className={ styles['tag__item'] }
                        >
                            <button
                                type="button"
                                onClick={ ()=> onRemoveTag( tag ) }
                            >
                                    <XIcon />
                            </button>
                            <span>
                                { tag }
                            </span>
                        </li>
                    ))
                }
                <li className={ styles['tag__input-content'] }>
                    <input
                        type="text"
                        autoComplete="off"
                        ref={ inputRef }
                        id={ fieldName }
                        name="inputText"
                        value={ inputText }
                        onChange={ ({ target })=> setInputText( target.value )}
                        placeholder={ tags.length === 0 ? placeholder : ''}
                        onKeyUp={({ code }) => code === 'Comma' ? onAddNewTag() : undefined}
                        className={styles['tag__input']}
                    />
                </li>
            </ul>
            {
                error &&
                <span className={styles['error-message']}>{error.message}</span>
            }
        </div>
    )
}
