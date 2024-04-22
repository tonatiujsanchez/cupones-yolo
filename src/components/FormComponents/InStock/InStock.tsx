import { FC, useEffect, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import { CustomSelectMultiple, InputSize } from '@/components'
import { getOptionsOfSizes } from '@/utils'
import { IInStockProduct, ISelectOption, ISize } from '@/interfaces'

import styles from './InStock.module.scss'

interface Props {
    sizes : ISize[]
    inStockSizes : IInStockProduct[]
    setInStockSizes: ( value:IInStockProduct[] ) => void
    error?: Merge<FieldError, Merge<FieldError, FieldErrorsImpl<IInStockProduct[]>>>
}
export const InStock:FC<Props> = ({ sizes, inStockSizes, setInStockSizes, error }) => {

    const [sizesSelected, setSizesSelected] = useState<ISize[]>([])

    useEffect(() => {
        setSizesSelected(inStockSizes.map( iss => iss.size ))
    },[inStockSizes])

    const onChangeSizes = ( option:ISelectOption ):ISize[] =>{

        const sizesProduct = sizesSelected

        const existOption = sizesProduct.find( size => size.value === option.value )

        if( existOption ){
            return sizesProduct.filter( size => size.value !== option.value )
        } else {
            const sizeToAdded = sizes.find( size => size.value === option.value )
            return [ ...sizesProduct, sizeToAdded! ]
        }
        
    }

    const sizesToInStockProduct = (sizesAdded:ISize[]) => {

        const inStockProductList = sizesAdded.map( size => {
            
            const isIncludes = inStockSizes.find( inStockSize => inStockSize.size._id === size._id )

            if( isIncludes ){
                return { size: size, quantity: isIncludes.quantity }
            }

            return { size: size, quantity: 0 }
        })

        setInStockSizes(inStockProductList)
    }

    const onSetQuality = ( value:number, id:string ) => {
        const inStockSizesUpdated = inStockSizes.map( 
            inStockSize => inStockSize.size._id === id 
                ? { ...inStockSize, quantity: value } 
                : inStockSize
            ) 
        setInStockSizes( inStockSizesUpdated )
    }


    return (
        <div>
            <CustomSelectMultiple
                fieldName='sizesProduct'
                label='Tallas e Inventario'
                options={getOptionsOfSizes(sizes)}
                optionsSelected={ getOptionsOfSizes(sizesSelected)}
                onChange={(value) => sizesToInStockProduct(onChangeSizes(value))}
                placeholder='Añade las tallas del producto'
                isRequired
                error={error}
            />
            <div className={ styles['in-stock__list'] }>
                {
                    inStockSizes.map( inStockSize => (
                        <InputSize
                            key={ inStockSize.size._id }
                            size={ inStockSize.size }
                            value={ inStockSize.quantity }
                            onChange={ value => onSetQuality( value, inStockSize.size._id! ) }
                        />
                    ))
                }
            </div>                         
        </div>
    )
}
