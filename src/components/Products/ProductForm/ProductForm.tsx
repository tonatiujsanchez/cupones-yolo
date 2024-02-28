import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useGetCategories, useGetSections } from '@/hooks'
import { ButtonPrimary, CustomSelectMultiple, InputText, WYSIWYGEditorLite } from '@/components'
import { getOptionsOfCategories, getOptionsOfSections } from '@/utils'
import { ICategory, IProduct, ISection, ISelectOption } from '@/interfaces'

import styles from './ProductForm.module.scss'

interface Props {
    product?: IProduct
}
export const ProductForm: FC<Props> = ({ product }) => {

    const { register, control, handleSubmit, formState:{ errors }, getValues } = useForm<IProduct>({
        defaultValues: {
            discountRate: 0,
            sections: [],
            category: [],
        }
    })

    const { sectionsQuery } = useGetSections({ page: 1 })
    const sections = sectionsQuery.data?.sections ?? []

    const { categoriesQuery } = useGetCategories({ page: 1 })
    const categories = categoriesQuery.data?.categories ?? []




    const onChangeSections = ( option:ISelectOption ):ISection[] =>{

        const sectionsProduct = getValues('sections')

        const existOption = sectionsProduct.find( section => section.slug === option.value )

        if( existOption ){
            return sectionsProduct.filter( section => section.slug !== option.value )
        } else {
            const sectionToAdded = sections.find( section => section.slug === option.value )
            return [ ...sectionsProduct, sectionToAdded! ]
        }
        
    }

    const onChangeCategories = ( option:ISelectOption ):ICategory[] =>{

        const categoriesProduct = getValues('category')

        const existOption = categoriesProduct.find( category => category.slug === option.value )

        if( existOption ){
            return categoriesProduct.filter( category => category.slug !== option.value )
        } else {
            const sectionToAdded = categories.find( section => section.slug === option.value )
            return [ ...categoriesProduct, sectionToAdded! ]
        }
        
    }



    const onProductSubmit = (data:IProduct) => {
        console.log(data)
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
                <div className="flex">
                    <InputText
                        type="number"
                        label="Precio"
                        fieldName="priceProduct"
                        placeholder="250"
                        min={ 1 }
                        error={ errors.price }
                        { ...register('price', {
                            required: 'El precio del producto es requerido',
                            validate: ( value )=> Number(value) <= 0 ? 'Valor no válido' : undefined
                        })}
                        isRequired
                    />
                    <InputText
                        type="number"
                        label="% Descuento"
                        fieldName="discountRateProduct"
                        placeholder="10"
                        min={ 0 }
                        max={ 100 }
                        error={ errors.discountRate }
                        { ...register('discountRate',{
                            validate: ( value )=> value && Number(value) < 0 || Number(value) > 100 ? 'Valor no válido, min 1 - max 100' : undefined
                        })}
                    />
                    <InputText
                        type="number"
                        label="Stock"
                        fieldName="stockProduct"
                        placeholder="15"
                        min={ 0 }
                        error={ errors.inStock }
                        { ...register('inStock', {
                            required: 'La cantidad de producto es requerido',
                            validate: ( value )=> Number(value) <= 0 ? 'Valor no válido' : undefined
                        })}
                        isRequired
                    />
                </div>
                <div className="flex items-start">
                    {
                        categoriesQuery.isFetching
                        ? <p>Cargando categorías...</p>
                        :(
                            <Controller
                                control={ control }
                                name="category"
                                render={({ field })=>(
                                    <CustomSelectMultiple
                                        fieldName='categoryProduct'
                                        label='Categoría'
                                        options={ getOptionsOfCategories( categories ) }
                                        optionsSelected={ getOptionsOfCategories( field.value ) }
                                        onChange={ ( value )=>  field.onChange( onChangeCategories(value) ) }
                                        placeholder='Elige una categoría'
                                        error={ errors.category }
                                        isRequired
                                    />
                                )}
                                rules={{
                                    validate: ( value )=> value.length === 0 ? 'Asigna a una categoría el producto' : undefined
                                }}
                            />
                        )
                    }
                    {
                        sectionsQuery.isFetching
                        ? <p>Cargando secciones...</p>
                        :(
                            <Controller
                                control={ control }
                                name="sections"
                                render={({ field })=>(
                                    <CustomSelectMultiple
                                        fieldName='sectionsProduct'
                                        label='Secciones'
                                        options={ getOptionsOfSections( sections ) }
                                        optionsSelected={ getOptionsOfSections(field.value) }
                                        onChange={ ( value )=>  field.onChange( onChangeSections(value) ) }
                                        placeholder='Añade al menos una sección'
                                        error={ errors.sections }
                                        isRequired
                                    />
                                )}
                                rules={{
                                    validate: ( value )=> value.length === 0 ? 'Añada al menos una sección al producto' : undefined
                                }}
                            />
                        )
                    }
                </div>
                <InputText
                    type="text"
                    label="Etiquetas"
                    fieldName="tagsProduct"
                    placeholder="Etiquetas del producto"
                    { ...register('tags', {
                        validate: ( value )=> value.length === 0 ? 'Añada al menos una etiqueta al producto' : undefined
                    })}
                    isRequired
                    // error={ errors.tags }
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
