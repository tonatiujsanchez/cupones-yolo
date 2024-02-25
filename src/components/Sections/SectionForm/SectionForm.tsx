import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { usePostSection } from '@/hooks'
import { getSlug, isValidSlug } from '@/libs'
import { ButtonPrimary, Dropzone, InputText, ModalFormHeader, Toggle } from '@/components'
import { ISection } from '@/interfaces'

import styles from './SectionForm.module.scss'


interface Props {
    section?: ISection
    // currentPage : number
    onClose     : ()=> void
}
export const SectionForm:FC<Props> = ({ section, onClose }) => {

    const { register, control, handleSubmit, watch, formState:{ errors }, getValues, setValue, reset } = useForm<ISection>({
        defaultValues: {
            active: true
        }
    })

    const { sectionPostMutation } = usePostSection( reset )

    useEffect(()=>{
        const { unsubscribe } = watch( (value, { name } )=>{
            
            if( name === 'title' && value.title){        
                if( section ){ return }
                handleChangeSlug()
            }
        })
        return () => unsubscribe()
    },[ watch ])

    const handleChangeSlug = () => {
        const slug = getSlug( getValues('title') )
        setValue('slug', slug, { shouldValidate: true })
    }

    const onSectionSubmit = ( data:ISection ) => {

        if(section){
            return console.log('Editando =>', section)
        }
        
        sectionPostMutation.mutate({ section: data })
    }

    return (
        <form
        onSubmit={ handleSubmit( onSectionSubmit ) }
            className={ styles['section-form'] }
        >
            <ModalFormHeader
                title={ section ? 'Editar Sección ' : 'Nueva Sección' }
                onClose={ onClose }
            />
            <div className={ styles['section-form__fields'] }>
                <div className={styles['section-form__cover']}>
                    <Dropzone
                        onClick={ ()=>{} }
                        placeholder="Añade una portada"
                        dimensions="1200 x 480"
                    />
                </div>
                <InputText
                    type="text"
                    fieldName="titleSection"
                    label="Nombre"
                    placeholder="Nombre de la sección"
                    isRequired
                    { ...register('title', {
                        required: 'El nombre es requerido'
                    })}
                    error={ errors.title }
                />
                <InputText
                    type="text"
                    fieldName="slugSection"
                    label="Slug"
                    placeholder="slug-de-la-seccion"
                    isRequired
                    { ...register('slug', {
                        required: 'El slug es requerido',
                        validate: ( value )=> !isValidSlug( value ) ? 'El slug no es válido' : undefined 
                    })}
                    error={ errors.slug }
                    className={'input-slug'}
                />
                <div className={ styles['section-form__toggles-container'] }>
                    <div className={ styles['section-form__toggle'] }>
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
                    disabled={ sectionPostMutation.isPending /* || sectionUpdateMutation.isPending */  }
                >
                    {
                        sectionPostMutation.isPending /* || sectionUpdateMutation.isPending  */ 
                        ?(
                            <div className="custom-loader-white"></div>
                        ):(
                            section ? 'Editar' : 'Agregar'
                        )
                    }
                </ButtonPrimary>
            </div>
        </form>
    )
}
