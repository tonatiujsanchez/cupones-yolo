import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ButtonPrimary, InputText, WYSIWYGEditorLite } from '@/components'
import { IProduct } from '@/interfaces'

import styles from './ProductForm.module.scss'

interface Props {
    product?: IProduct
}
export const ProductForm: FC<Props> = ({ product }) => {

    const { register, control, handleSubmit, formState:{ errors } } = useForm<IProduct>({
        defaultValues: {

        }
    })

    const onProductSubmit = (data:IProduct) => {
    
    }

    return (
        <form 
            onSubmit={ handleSubmit( onProductSubmit ) }
            className={ styles['form-product'] }
        >
            <h6 className={ styles['form-product__subtitle'] }>Información principal</h6>
            <div>
                <InputText
                    type="text"
                    label="Nombre del producto"
                    fieldName="titleProduct"
                    placeholder="Nombre del producto"
                    error={ errors.title }
                    { ...register('title', {
                        required: 'El título del producto es requerido'
                    })}
                    isRequired
                />
                <Controller
                    control={ control }
                    name="description"
                    render={({ field })=>(
                        <WYSIWYGEditorLite
                            label="Descripción"
                            fieldName="descriptionProduct"
                            placeholder="Playera básica color negro manga corta con estampado frontal texto"
                            onChange={ field.onChange }
                            value={ field.value }
                            error={ errors.description }
                            className={ styles['form-product__description'] }
                            isRequired
                        />
                    )}
                    rules={{ required: 'La descripción del producto es requerida' }}
                />
                <div className={ styles['flex'] }>
                    <InputText
                        type="number"
                        label="Precio del producto"
                        fieldName="priceProduct"
                        placeholder="250"
                        error={ errors.price }
                        { ...register('price', {
                            required: 'El precio del producto es requerido'
                        })}
                        isRequired
                    />
                    <InputText
                        type="number"
                        label="Stock"
                        fieldName="stockProduct"
                        placeholder="15"
                        error={ errors.inStock }
                        { ...register('inStock', {
                            required: 'La cantidad de producto es requerido'
                        })}
                        isRequired
                    />
                </div>
                <div className={ styles['button-container'] }>
                    <ButtonPrimary type="submit">
                        {
                            false
                            ? ( <div className="custom-loader-white"></div> )
                            : ( 'Guardar' )
                        }
                    </ButtonPrimary>
                </div>
            </div>
        </form>
    )
}
