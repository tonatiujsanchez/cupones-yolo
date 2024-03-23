import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toastError, toastSuccess } from '@/libs'
import { imagesActions } from '@/services'

export const useUploadImage = () => {
    const uploadImageMutation = useMutation({
        mutationFn: imagesActions.uploadImage,
        onSuccess: ( newImage )=> {

            // FIXME: Añadir la nueva imagen al cache
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
