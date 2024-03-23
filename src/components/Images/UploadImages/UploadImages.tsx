import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { toastError } from '@/libs'
import { useUploadImage } from '@/hooks'
import { ButtonSelectFiles, ButtonSoftPrimary } from '@/components'
import { UploadCloudIcon, XIcon } from '@/components/Icons'
import { arrayFilesToFileList } from '@/utils'
import { TYPE_OF_ACCEPTED_IMAGES } from '@/constants'
import { ISectionImage } from '@/interfaces'

import styles from './UploadImages.module.scss'


interface Props {
    section: ISectionImage
}
export const UploadImages:FC<Props> = ({ section='products' }) => {

    const [files, setFiles] = useState<FileList | null>(null)
    const [fileDataURLs, setFileDataURLs] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)


    const { uploadImageMutation } = useUploadImage()


    
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {

        if( !e.target.files || e.target.files.length === 0 ){
            setFileDataURLs([])
            return
        }
        
        const fileSelected = e.target.files

        for (let i = 0; i < fileSelected.length; i++) {
            const currentFile = fileSelected[i]
            if( !currentFile.type.match(TYPE_OF_ACCEPTED_IMAGES) ){
                return toastError('Formato no válido')
            }
        }

        setFiles(fileSelected)
    }

    useEffect(() => {
        const imageUrls: string[] = []

        if(files){
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const reader = new FileReader()

                reader.onload = () => {
                  if (reader.result) {
                    imageUrls.push(reader.result as string)
                    if (imageUrls.length === files.length) {
                      setFileDataURLs(imageUrls)
                    }
                  }
                };
                reader.readAsDataURL(file)
            }
        }
    }, [files])


    const onRemoveFile = ( idx: number ) => {
        setFileDataURLs( fileDataURLs.filter( (_, index) => index !== idx ) )

        const updatedFileListArray = Array.from(files!).filter((_, index) => index !== idx)
        const updatedFileList = arrayFilesToFileList(updatedFileListArray)
        setFiles(updatedFileList)
    }

    const onClearImages = async() => {
        setFiles(null)
        setFileDataURLs([])
    }

    const uploadImages = async() => {
        
        if( !files ){
            return
        }

        const filesArr = Array.from(files)
        
        const filesFormData = filesArr.map( file => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('section', section)
            return formData
        })

        setLoading(true)
        await Promise.all( filesFormData.map( 
            fileFormData => uploadImageMutation.mutateAsync({ formData: fileFormData }) ) 
        )
        setLoading(false)

        onClearImages()

    }


    return (
        <div className={ styles['upload'] }>
            <div className={ styles['upload-actions'] }>
                <ButtonSelectFiles
                    onClick={ ()=> fileInputRef.current?.click() }
                    lengthFiles={ files?.length ?? 0 }
                    disabled={ loading } //FIXME:
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <ButtonSoftPrimary
                    type="button"
                    className={styles['upload-actions__button']}
                    onClick={ uploadImages }
                    disabled={ !files || files.length === 0 || loading }
                >
                    {
                        loading //FIXME:
                            ? <>
                                <div className={` custom-loader-primary ${ styles['upload-actions__button-loader'] }`}></div>
                                <span className="ml-2">Subiendo...</span>
                            </>
                            : <>
                                <UploadCloudIcon />
                                Subir
                            </>
                    }
                </ButtonSoftPrimary>
            </div>
            <div className={ styles['files-preview'] }>
                {
                    fileDataURLs.map( ( file, idx ) => (
                        <div key={file} className={ styles['files-preview__item'] }>
                            <Image 
                                src={file}
                                alt="Imagen preview"
                                width={80}
                                height={80}
                                className={ styles['files-preview__img'] }
                            />
                            <button
                                type="button"
                                onClick={ () => onRemoveFile( idx ) }
                                className={ styles['files-preview__button-remove'] }
                            >
                                <XIcon />
                            </button>
                        </div>
                        
                    ))
                }                
            </div>
        </div>
    )
}
