import { FC, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { getSlug, isValidSlug } from '@/libs'
import { useGetCategories, useGetSections, useGetSizes, usePostProduct, useUpdateProduct } from '@/hooks'
import { ButtonLight, ButtonOutlinePrimary, ButtonPrimary, CustomSelectMultiple, DropzoneMultiple, InputTags, InputText, ReloadableInput, WYSIWYGEditorLite } from '@/components'
import { getOptionsOfCategories, getOptionsOfSections, getOptionsOfSizes, getSku } from '@/utils'
import { IMAGES_SECTIONS } from '@/constants'
import { ICategory, IProduct, ISection, ISectionImage, ISelectOption, ISize } from '@/interfaces'

import styles from './ProductForm.module.scss'

interface Props {
    product?: IProduct
}
export const ProductForm: FC<Props> = ({ product }) => {
    
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const { register, control, handleSubmit, formState:{ errors }, getValues, setValue, watch, reset } = useForm<IProduct>({
        defaultValues: {
            discountRate: 0,
            sections: [],
            category: [],
            sizes   : [],
            tags    : [],
            slug    : '',
            sku     : '',
            _id     : '',
            images  : [],
            active  : true
        }
    })
    
    const { productPostMutation } = usePostProduct()
    const { productUpdateMutation } = useUpdateProduct()

    const { sectionsQuery } = useGetSections({ page: 1 })
    const sections = sectionsQuery.data?.sections ?? []

    const { categoriesQuery } = useGetCategories({ page: 1 })
    const categories = categoriesQuery.data?.categories ?? []

    const { sizesQuery } = useGetSizes({ page: 1 })
    const sizes = sizesQuery.data?.sizes ?? []

    useEffect(() => {
        if(product){
            reset({...product})   
        }        
    }, [product])
    

    useEffect(()=>{
        if(!product) {
            handleChangeSku()
        }
    },[])

    useEffect(()=>{
        const { unsubscribe } = watch( (value, { name } )=>{
            
            if( name === 'title' && value.title ){        
                if( product ){ return }
                handleChangeSlug()
            }
        })
        return () => unsubscribe()
    },[ watch ])


    const handleChangeSlug = () => {
        const slug = getSlug( getValues('title') )
        setValue('slug', slug, { shouldValidate: true })
    }

    const handleChangeSku = () => {
        const sku = getSku()
        setValue('sku', sku, { shouldValidate: true })
    }


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

    const onChangeSizes = ( option:ISelectOption ):ISize[] =>{

        const sizesProduct = getValues('sizes')

        const existOption = sizesProduct.find( size => size.value === option.value )

        if( existOption ){
            return sizesProduct.filter( size => size.value !== option.value )
        } else {
            const sizeToAdded = sizes.find( size => size.value === option.value )
            return [ ...sizesProduct, sizeToAdded! ]
        }
        
    }

    
    const onCancel = () => {
        router.replace('/dashboard/productos')
    }

    const onSaveProducto = ( data:IProduct ) => {
        data.active = false

        if(product){
            productUpdateMutation.mutate({ product: { ...data, _id: product._id } })
            return
        }

        productPostMutation.mutate({ product: data })
    }

    const onProductSubmit = ( data:IProduct ) => {
        if(product){
            productUpdateMutation.mutate({ product: { ...data, _id: product._id } })
            return
        }
        productPostMutation.mutate({ product: data })
    }
 

    return (
        <form 
            onSubmit={ handleSubmit( onProductSubmit ) }
            ref={ formRef }
            className={ styles['form-product'] }
        >
            <h6 className={ styles['form-product__subtitle'] }>Fotos</h6>
            <div className={ styles['form-product__dropzone-container'] }>
                <Controller
                    control={ control }
                    name="images"
                    render={({ field })=>(
                        <DropzoneMultiple
                            values={ field.value }
                            onChange={ field.onChange }
                            placeholder="Añada fotos del producto"
                            section={ IMAGES_SECTIONS.products as ISectionImage }
                            error={ errors.images }
                        />
                    )}
                    rules={{
                        required: 'Añada imágenes al producto',
                        validate: (value) => value && value.length < 2 ? 'Se requiere al menos 2 imágenes' : undefined
                    }}
                />
            </div>
            <h6 className={ styles['form-product__subtitle'] }>Información principal</h6>
            <div className={ styles['form-product__information-container'] }>
                <InputText
                    type="text"
                    label="Nombre del producto"
                    fieldName="titleProduct"
                    placeholder="Nombre del producto"
                    error={ errors.title }
                    { ...register('title', {
                        required: 'El título del producto es requerido',
                        validate: (val) => val && val.trim().length === 0 ? 'El título del producto es requerido' : undefined
                    })}
                    isRequired
                />
                <div className="flex">
                    <InputText
                        type="number"
                        label="Precio"
                        fieldName="priceProduct"
                        placeholder="250"
                        step="any"
                        min={ 1 }
                        error={ errors.price }
                        { ...register('price', {
                            required: 'El precio del producto es requerido',
                            validate: ( value )=> Number(value) <= 0 ? 'Valor no válido' : undefined,
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
                <div>
                {
                    sizesQuery.isFetching
                        ? <p>Cargando tallas...</p>
                        :(
                            <Controller
                                control={ control }
                                name="sizes"
                                render={({ field })=>(
                                    <CustomSelectMultiple
                                        fieldName='sizesProduct'
                                        label='Tallas'
                                        options={ getOptionsOfSizes( sizes ) }
                                        optionsSelected={ getOptionsOfSizes(field.value) }
                                        onChange={ ( value )=>  field.onChange( onChangeSizes(value) ) }
                                        placeholder='Añade las tallas del producto'
                                        error={ errors.sizes }
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
                <Controller
                    control={ control }
                    name="tags"
                    render={({ field })=>(
                        <InputTags
                            tags={ field.value }
                            onChange={ field.onChange }
                            label="Etiquetas"
                            fieldName="tagsProducts"
                            placeholder="Presiona [coma] para agregar"
                        />
                    )}
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

                <Controller
                    control={ control }
                    name="slug"
                    render={({ field })=>(
                        <ReloadableInput
                            fieldName="slugProduct"
                            label="Slug"
                            value={ field.value }
                            onChange={ field.onChange }
                            reload={ handleChangeSlug }
                            error={ errors.slug }
                            isRequired
                        />
                    )}
                    rules={{
                        required: 'El slug es requerido',
                        validate: ( value )=> !isValidSlug( value ) ? 'El slug no es válido' : undefined 
                    }}
                />
                <div className="flex">
                    <Controller
                        control={ control }
                        name="sku"
                        render={({ field })=>(
                            <ReloadableInput
                                label="SKU"
                                fieldName="skuProduct"
                                value={ field.value }
                                onChange={ field.onChange }
                                reload={ handleChangeSku }
                                placeholder="SKU del producto"
                                error={ errors.sku }
                                disabled
                                isRequired
                            />
                        )}
                        rules={{
                            required: 'El SKU del producto es requerido',
                            validate: (val) => val && val.trim().length === 0 ? 'El SKU del producto es requerido' : undefined
                        }}
                    />
                    <InputText
                        type="text"
                        label="ID del producto"
                        fieldName="idProduct"
                        placeholder="El ID se generará automáticamente al guardar"
                        error={ errors._id }
                        { ...register('_id')}
                        disabled
                        isRequired
                    />
                </div>
            </div>

            <div className={ styles['buttons'] }>
                <div className={ styles['button__cancel'] }>
                    <ButtonLight
                        type="button"
                        onClick={ onCancel }
                        disabled={ productPostMutation.isPending || productUpdateMutation.isPending }
                    >
                        Cancelar
                    </ButtonLight>
                </div>
                <div className={ styles['buttons__content'] }>
                    <ButtonOutlinePrimary
                        type="button"
                        disabled={ productPostMutation.isPending || productUpdateMutation.isPending }
                        onClick={ handleSubmit( onSaveProducto ) }
                    >
                        {
                            productPostMutation.isPending
                            ? ( <div className="custom-loader-primary"></div> )
                            : ( 'Guardar' )
                        }
                    </ButtonOutlinePrimary>
                    <ButtonPrimary 
                        type="submit"
                        disabled={ productPostMutation.isPending || productUpdateMutation.isPending }
                    >
                        {
                            productPostMutation.isPending
                            ? ( <div className="custom-loader-white"></div> )
                            : ( 'Publicar' )
                        }
                    </ButtonPrimary>
                </div>
            </div>
        </form>
    )
}
