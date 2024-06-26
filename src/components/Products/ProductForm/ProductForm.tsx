import { FC, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { getSlug, isValidSlug } from '@/libs'
import { useGetBrands, useGetCategories, useGetSections, useGetSizes, usePostProduct, useUpdateProduct } from '@/hooks'
import { ButtonLight, ButtonOutlinePrimary, ButtonPrimary, CustomSelectMultiple, DropzoneMultiple, InStock, InputTags, InputText, ReloadableInput, WYSIWYGEditorLite } from '@/components'
import { getOptionsOfBrands, getOptionsOfCategories, getOptionsOfSections, getSku } from '@/utils'
import { IMAGES_SECTIONS } from '@/constants'
import { IBrand, ICategory, IProduct, ISection, ISectionImage, ISelectOption } from '@/interfaces'

import styles from './ProductForm.module.scss'

interface Props {
    product?: IProduct
    page?: number
    searchTerm?: string
}
export const ProductForm: FC<Props> = ({ product, page, searchTerm }) => {
    
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const { register, control, handleSubmit, formState:{ errors }, getValues, setValue, watch, reset } = useForm<IProduct>({
        defaultValues: {
            discountRate: 0,
            sections: [],
            category: [],
            brands  : [],
            inStock : [],
            tags    : [],
            slug    : '',
            sku     : '',
            _id     : '',
            images  : [],
            active  : true
        }
    })
    
    const { productPostMutation } = usePostProduct()
    const { productUpdateMutation } = useUpdateProduct({ page, searchTerm })

    const { sectionsQuery } = useGetSections({ page: 1 })
    const sections = sectionsQuery.data?.sections ?? []

    const { categoriesQuery } = useGetCategories({ page: 1 })
    const categories = categoriesQuery.data?.categories ?? []

    const { brandsQuery } = useGetBrands({ page: 1 })
    const brands = brandsQuery.data?.brands ?? []

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

    const onChangeBrands = ( option:ISelectOption ):IBrand[] =>{

        const brandsProduct = getValues('brands')
        
        const existOption = brandsProduct.find( brand => brand.slug === option.value )

        if( existOption ){
            return brandsProduct.filter( brand => brand.slug !== option.value )
        }else {
            const brandToAdded = brands.find( brand => brand.slug === option.value )
            return [ ...brandsProduct, brandToAdded! ]
        }
    }
    
    const onCancel = () => {
        router.replace('/dashboard/productos')
    }

    const onSaveProducto = ( data:IProduct ) => {
        data.active = false

        if(product){
            productUpdateMutation.mutate({ 
                product: { ...data, _id: product._id } 
            })
            return
        }

        productPostMutation.mutate({ product: data })
    }

    const onProductSubmit = ( data:IProduct ) => {
        data.active = true
        
        if(product){
            productUpdateMutation.mutate({ 
                product: { ...data, _id: product._id }
            })
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
                    {
                        brandsQuery.isFetching
                        ? <p>Cargando marcas...</p>
                        :(
                            <Controller 
                                control={ control }
                                name="brands"
                                render={({ field })=>(
                                    <CustomSelectMultiple
                                        fieldName='brandsProduct'
                                        label='Marca'
                                        options={ getOptionsOfBrands( brands ) }
                                        optionsSelected={ getOptionsOfBrands( field.value ) }
                                        onChange={ ( value )=>  field.onChange( onChangeBrands(value) ) }
                                        placeholder='Elige una marca'
                                    />
                                )}
                            />
                        )
                    }
                </div>
                <div>
                {
                    sizesQuery.isFetching
                    ?(<p>Cargando tallas...</p>)
                    :(
                        <Controller
                            control={ control }
                            name="inStock"
                            render={({ field })=>(
                                <InStock 
                                    sizes={ sizes }
                                    inStockSizes={ field.value }
                                    setInStockSizes={ field.onChange }
                                    error={ errors.inStock }
                                />
                            )}
                            rules={{
                                validate: ( value )=> value.length === 0 ? 'Añada al menos una talla al producto' : undefined
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
                        Regresar
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
