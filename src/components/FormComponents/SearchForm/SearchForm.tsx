import { FC, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form'

import { SearchIcon } from '@/components/Icons'
import { GRAY_LIGHT_COLOR, PRIMARY_COLOR } from '@/constants'

import styles from './SearchForm.module.scss'


interface IFormData {
    searchTerm:string
}
interface Props {
    placeholder?: string
}
export const SearchForm:FC<Props> = ({ placeholder='Buscar' }) => {

    const { register, handleSubmit } = useForm<IFormData>({
        defaultValues: {
            searchTerm: ''
        }
    })

    const formRef = useRef<HTMLFormElement>(null)

    const onInputFocus = () => {
        formRef.current?.classList.add(styles['search-form-focus'])
    }

    const onInputBlur = () => {
        formRef.current?.classList.remove(styles['search-form-focus'])
    }
    
    useEffect(()=>{

        const inputSearch = formRef.current!.querySelector('input') as HTMLInputElement

        inputSearch.addEventListener('focus', onInputFocus)
        inputSearch.addEventListener('blur', onInputBlur)
    
        return ()=> {
            inputSearch.removeEventListener('focus', onInputFocus)
            inputSearch.removeEventListener('blur', onInputBlur)
        }
    },[])

    const onSearchSubmit = (data:IFormData) => {
        console.log(data)
        
    }


    return (
        <form
            ref={ formRef }
            onSubmit={ handleSubmit( onSearchSubmit ) }
            className={ styles['search-form'] }
        >
            <input
                type="text"
                placeholder={ placeholder }
                className={ styles['search-input'] }
                { ...register('searchTerm', {
                    required: true,
                    validate: (val) => val && val.trim().length >= 1 ? undefined : ''
                })}
            />
            <button
                type="submit"
                className={ styles['search-button'] }
            >
                <SearchIcon strokeWidth={ 1.8 }/>
            </button>
        </form>
    )
}
