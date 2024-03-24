import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toastError, toastSuccess } from '@/libs'
import { imagesActions } from '@/services'
import { IImagesResp, ISelectOption } from '@/interfaces'
import { IMAGES_QUERY_KEY } from '@/constants'

interface Props {
    curentSection: ISelectOption
    page         : number
}
export const useUploadImage = ({ curentSection, page }:Props) => {

    const queryClient = useQueryClient()


    const uploadImageMutation = useMutation({
        mutationFn: imagesActions.uploadImage,
        onSuccess: ( newImage )=> {
            queryClient.setQueryData<IImagesResp>(
                [ IMAGES_QUERY_KEY, { section:curentSection.value, page  } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            images: [ newImage, ...oldData.images ],
                            pageSize: oldData.pageSize + 1,
                            totalImages: oldData.totalImages + 1,
                        }
                    }
                    return oldData
                }   
            )
            console.log(newImage)
            toastSuccess('Imagen cargada')
        },
        onError: (error:AxiosError<{ msg:string }>)=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })


    
    return {
        uploadImageMutation
    }
}
