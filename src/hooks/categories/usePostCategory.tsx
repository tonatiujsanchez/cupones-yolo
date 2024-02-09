import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { categoriesActions } from '@/services'


export const usePostCategory = (reset:()=>void) => {

    const categoryPostMutation = useMutation({
        mutationFn: categoriesActions.newCategory,
        onSuccess: ( data ) => {
            toastSuccess('Categoría agregada')
            reset()
            // FIXME: Agregar la nueva categoría al cache
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        categoryPostMutation
    }
}
