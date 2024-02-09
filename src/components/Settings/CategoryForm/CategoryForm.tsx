import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonPrimary, Dropzone, InputText, ModalFormHeader, } from '@/components'
import { ICategory } from '@/interfaces'

import styles from './CategoryForm.module.scss'
import { usePostCategory } from '@/hooks'


interface Props {
    category?: ICategory
    onClose  : ()=> void
}
export const CategoryForm:FC<Props> = ({ category, onClose }) => {

    const { register, handleSubmit, formState:{ errors } } = useForm<ICategory>()
    const { categoryPostMutation } = usePostCategory()

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
                        required: 'El slug es requerido'
                    })}
                    error={ errors.slug }
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
