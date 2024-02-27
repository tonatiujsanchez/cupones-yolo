import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { usePostSize } from '@/hooks'
import { ButtonPrimary, InputText, ModalFormHeader, Toggle } from '@/components'
import { ISize } from '@/interfaces'

import styles from './SizeForm.module.scss'

interface Props {
    size?      : ISize
    onClose    : ()=> void
    currentPage: number
}
export const SizeForm:FC<Props> = ({ size, onClose, currentPage }) => {
    
    const { register, control, handleSubmit, formState:{ errors }, reset } = useForm<ISize>({
        defaultValues: {
            active: true
        }
    })

    const { sizePostMutation } = usePostSize( reset )

    const onSizeSubmit = ( data:ISize ) => {
        if( size ){
            return console.log('Editar...')
        }

        sizePostMutation.mutate({ size: data })
    }

    return (
        <form
            onSubmit={ handleSubmit( onSizeSubmit ) }
            className={ styles['size-form'] }
        >
            <ModalFormHeader
                title={ size ? 'Editar Talla ' : 'Nueva Talla' }
                onClose={ onClose }
            />
            <div className={ styles['size-form__fields'] }>
                <InputText
                    type="text"
                    fieldName="titleSize"
                    label="Talla"
                    placeholder="XS, S, M, L, XL"
                    isRequired
                    { ...register('label', {
                        required: 'La talla es requerida'
                    })}
                    error={ errors.label }
                />
                <div className={ styles['size-form__toggles-container'] }>
                    <div className={ styles['size-form__toggle'] }>
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
                    disabled={ sizePostMutation.isPending /* || sizeUpdateMutation.isPending */  }
                >
                    {
                        sizePostMutation.isPending /* || sizeUpdateMutation.isPending */  
                        ?(
                            <div className="custom-loader-white"></div>
                        ):(
                            size ? 'Editar' : 'Agregar'
                        )
                    }
                </ButtonPrimary>
            </div>
        </form>
    )
}
