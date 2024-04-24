import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonPrimary, Dropzone, InputText, ModalFormHeader, Toggle } from '@/components'
import { getSlug, isValidSlug } from '@/libs'
import { IBrand } from '@/interfaces'

import styles from './BrandForm.module.scss'
import { usePostBrand } from '@/hooks'
interface Props {
    brand?     : IBrand
    currentPage: number
    onClose    : ()=> void
}
export const BrandForm:FC<Props> = ({ brand, onClose, currentPage }) => {

    const { register, handleSubmit, watch, formState:{ errors }, control, getValues, setValue, reset } = useForm<IBrand>({
        defaultValues: {
            active: true,
        }
    })

    const { brandPostMutation } = usePostBrand( reset )
    
    useEffect(()=> {
        if( brand ){
            reset({
                image: brand.image,
                title: brand.title,
                slug: brand.slug,
                active: brand.active,
            })
        }
    },[brand])

    useEffect(()=>{
        const { unsubscribe } = watch( (value, { name } )=>{
            
            if( name === 'title' && value.title){        
                if( brand ){ return }
                handleChangeSlug()
            }
        })
        return () => unsubscribe()
    },[ watch ])

    const handleChangeSlug = () => {
        const slug = getSlug( getValues('title') )
        setValue('slug', slug, { shouldValidate: true })
    }

    const onBrandSubmit = ( data:IBrand ) => {
        console.log(data)

        if( brand ){
            return console.log('Editar marca')
        }

        brandPostMutation.mutate({ brand: data })
    }
    

    return (
        <form
            className={styles['brand-form']}
            onSubmit={ handleSubmit( onBrandSubmit ) }
        >
            <ModalFormHeader
                title={ brand ? 'Editar Marca' : 'Nueva Marca' }
                onClose={ onClose }
            />
            <div className={ styles['brand-form__fields'] }>
                <div className={styles['brand-form__cover']}>
                    <Dropzone
                        onClick={ ()=>{} }
                        placeholder="Añade una imagen"
                        dimensions="240 x 240 (recomendado)"
                    />
                </div>
                <InputText
                    type="text"
                    fieldName="titleBrand"
                    label="Nombre"
                    placeholder="Nombre de la marca"
                    isRequired
                    { ...register('title', {
                        required: 'El nombre es requerido'
                    })}
                    error={ errors.title }
                />
                <InputText
                    type="text"
                    fieldName="slugBrand"
                    label="Slug"
                    placeholder="nombre-de-la-marca"
                    isRequired
                    { ...register('slug', {
                        required: 'El slug es requerido',
                        validate: ( value )=> !isValidSlug( value ) ? 'El slug no es válido' : undefined 
                    })}
                    error={ errors.slug }
                    className={'input-slug'}
                />
                <div className={ styles['brand-form__toggles-container'] }>
                    <div className={ styles['brand-form__toggle'] }>
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
                </div>
                <div className={ styles['button-container'] }>
                <ButtonPrimary
                    type="submit"
                    disabled={ brandPostMutation.isPending }
                    // disabled={ brandPostMutation.isPending || categoryUpdateMutation.isPending  }
                >
                    {
                        // categoryPostMutation.isPending || categoryUpdateMutation.isPending  
                        brandPostMutation.isPending
                        ?(
                            <div className="custom-loader-white"></div>
                        ):(
                            brand ? 'Editar' : 'Agregar'
                        )
                    }
                </ButtonPrimary>
            </div>
            </div>
        </form>
    )
}
