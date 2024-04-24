import { toastError, toastSuccess } from '@/libs'
import { brandsActions } from '@/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const usePostBrand = ( reset: ()=> void ) => {
    
    const queryClient = useQueryClient()
    
    const brandPostMutation = useMutation({
        mutationFn: brandsActions.newBrand,
        onSuccess: ( newBrand ) => {
            console.log(newBrand)
            toastSuccess('Categoría agregada')
            reset()
        },
        onError: ( error:AxiosError<{ msg:string }>  )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })

    return {
        brandPostMutation
    }
}
