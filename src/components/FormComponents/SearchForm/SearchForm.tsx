import { FC, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SearchIcon } from '@/components/Icons'

import styles from './SearchForm.module.scss'


interface IFormData {
    searchTerm:string
}
interface Props {
    placeholder?: string
    onSubmit    : ( searchTerm:string ) => void
    fieldName   : string
}
export const SearchForm:FC<Props> = ({ placeholder='Buscar', onSubmit, fieldName }) => {

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
        onSubmit( data.searchTerm.trim() )        
    }

    return (
        <form
            ref={ formRef }
            onSubmit={ handleSubmit( onSearchSubmit ) }
            className={ styles['search-form'] }
        >
            <input
                type="text"
                id={ fieldName }
                placeholder={ placeholder }
                className={ styles['search-input'] }
                { ...register('searchTerm')}
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
