import { FC, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { getSlug, isValidSlug } from '@/libs'
import { usePostCategory } from '@/hooks'
import { ButtonPrimary, Dropzone, InputText, ModalFormHeader, Toggle, } from '@/components'
import { ICategory } from '@/interfaces'

import styles from './CategoryForm.module.scss'


interface Props {
    category?: ICategory
    onClose  : ()=> void
}
export const CategoryForm:FC<Props> = ({ category, onClose }) => {

    const { register, handleSubmit, watch, formState:{ errors }, control, getValues, setValue, reset } = useForm<ICategory>({
        defaultValues: {
            active: true,
            pinned: true
        }
    })
    const { categoryPostMutation } = usePostCategory(reset)

    const slugRef = useRef({})
    slugRef.current = watch('slug', '')

    useEffect(()=>{
        if(category){
            reset({
                cover: category.cover,
                title: category.title,
                slug: category.slug,
                active: category.active,
                pinned: category.pinned,
            })
        }
    },[category])

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
            return console.log('Editar catería') //FIXME:
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
                        validate: ( value )=> !isValidSlug( value ) ? 'El slug no es válido' : undefined 
                    })}
                    error={ errors.slug }
                    className={'input-slug'}
                />
                <div className={ styles['category-form__toggles-container'] }>
                    <div className={ styles['category-form__toggle'] }>
                        <label 
                            htmlFor="active"
                            className="input-label"
                        >
                                Activo
                        </label>
                        <Controller
                            control={ control }
                            name="active"
                            render={({ field })=>(
                                <Toggle
                                    fieldName="active" 
                                    value={ field.value } 
                                    onChange={ field.onChange }
                                />
                            )}
                        />
                    </div>
                    <div className={ styles['category-form__toggle'] }>
                        <label 
                            htmlFor="pinned"
                            className="input-label"
                        >
                            Destacado
                        </label>
                        <Controller
                            control={ control }
                            name="pinned"
                            render={({ field })=>(
                                <Toggle
                                    fieldName="pinned" 
                                    value={ field.value } 
                                    onChange={ field.onChange }
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={ styles['button-container'] }>
                <ButtonPrimary
                    type="submit"
                    disabled={ categoryPostMutation.isPending }
                >
                    {
                        categoryPostMutation.isPending 
                        ?(
                            <div className="custom-loader-white"></div>
                        ):(
                            category ? 'Editar' : 'Agregar'
                        )
                    }
                </ButtonPrimary>
            </div>
        </form>
    )
}
