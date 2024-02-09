import { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { getSlug, isValidSlug } from '@/libs'
import { usePostCategory } from '@/hooks'
import { ButtonPrimary, Dropzone, InputText, ModalFormHeader, } from '@/components'
import { ICategory } from '@/interfaces'

import styles from './CategoryForm.module.scss'


interface Props {
    category?: ICategory
    onClose  : ()=> void
}
export const CategoryForm:FC<Props> = ({ category, onClose }) => {

    const { register, handleSubmit, watch, formState:{ errors }, getValues, setValue } = useForm<ICategory>()
    const { categoryPostMutation } = usePostCategory()

    const slugRef = useRef({})
    slugRef.current = watch('slug', '')

    useEffect(()=>{
        const { unsubscribe } = watch( (value, { name } )=>{
            
            if( name === 'title' && value.title){        
                if( category ){ return }
                handleChangeSlug()
            }
        })
        return () => unsubscribe()
    },[ watch ])

    const handleChangeSlug = () => {
        const slug = getSlug( getValues('title') )
        setValue('slug', slug, { shouldValidate: true })
    }

    const onCategorySubmit = ( data:ICategory ) => {
        if( category ){
            return console.log('Editar catería')
        }
        categoryPostMutation.mutate({ category:data })
    }

    return (
        <form 
            onSubmit={ handleSubmit( onCategorySubmit ) }
            className={ styles['category-form'] }
        >
            <ModalFormHeader
                title={ category ? 'Editar Categoría' : 'Nueva Categoría' }
                onClose={ onClose }
            />
            <div className={ styles['category-form__fields'] }>
                <div className={styles['category-form__cover']}>
                    <Dropzone
                        onClick={ ()=>{} }
                        placeholder="Añade una portada"
                        dimensions="1200 x 480"
                    />
                </div>
                <InputText
                    type="text"
                    fieldName="titleCategory"
                    label="Nombre"
                    placeholder="Nombre de la categoría"
                    isRequired
                    { ...register('title', {
                        required: 'El nombre es requerido'
                    })}
                    error={ errors.title }
                />
                <InputText
                    type="text"
                    fieldName="slugCategory"
                    label="Slug"
                    placeholder="nombre-de-la-categoria"
                    isRequired
                    { ...register('slug', {
                        required: 'El slug es requerido',
                        validate: ( value )=> !isValidSlug( value ) && 'El slug no es válido' 
                    })}
                    error={ errors.slug }
                    className={'input-slug'}
                />
                
            </div>
            <div className={ styles['button-container'] }>
                <ButtonPrimary
                    type="submit"
                >
                    { category ? 'Editar' : 'Agregar' }
                </ButtonPrimary>
            </div>
        </form>
    )
}
