import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonPrimary, Dropzone, InputText, ModalFormHeader, Toggle } from '@/components'
import { IProductType } from '@/interfaces'
import { getSlug, isValidSlug } from '@/libs'

import styles from './ProductTypesForm.module.scss'


interface Props {
    productType?: IProductType
    // currentPage : number
    onClose     : ()=> void
}
export const ProductTypesForm:FC<Props> = ({ productType, onClose }) => {

    const { register, control, handleSubmit, watch, formState:{ errors }, getValues, setValue } = useForm<IProductType>({
        defaultValues: {
            active: true
        }
    })

    useEffect(()=>{
        const { unsubscribe } = watch( (value, { name } )=>{
            
            if( name === 'title' && value.title){        
                if( productType ){ return }
                handleChangeSlug()
            }
        })
        return () => unsubscribe()
    },[ watch ])

    const handleChangeSlug = () => {
        const slug = getSlug( getValues('title') )
        setValue('slug', slug, { shouldValidate: true })
    }

    const onProductTypeSubmit = ( data:IProductType ) => {

        if(productType){
            return console.log('Editando =>', productType)
        }
        
        console.log('Nuevo',data)
    }

    return (
        <form
        onSubmit={ handleSubmit( onProductTypeSubmit ) }
            className={ styles['product-type-form'] }
        >
            <ModalFormHeader
                title={ productType ? 'Editar Tipo de Producto ' : 'Nuevo Tipo de Producto' }
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
                    fieldName="titleProductType"
                    label="Nombre"
                    placeholder="Nombre del tipo de producto"
                    isRequired
                    { ...register('title', {
                        required: 'El nombre es requerido'
                    })}
                    error={ errors.title }
                />
                <InputText
                    type="text"
                    fieldName="slugProductType"
                    label="Slug"
                    placeholder="nombre-del-tipo-de-producto"
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
                </div>
            </div>
            <div className={ styles['button-container'] }>
                <ButtonPrimary
                    type="submit"
                    // disabled={ categoryPostMutation.isPending || categoryUpdateMutation.isPending  }
                >
                    {
                        // categoryPostMutation.isPending || categoryUpdateMutation.isPending  
                        false
                        ?(
                            <div className="custom-loader-white"></div>
                        ):(
                            productType ? 'Editar' : 'Agregar'
                        )
                    }
                </ButtonPrimary>
            </div>
        </form>
    )
}
