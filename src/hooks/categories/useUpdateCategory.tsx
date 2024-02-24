import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { categoriesActions } from '@/services'
import { ICategoriesResp } from '@/interfaces'
import { CATEGORIES_QUERY_KEY } from '@/constants'


export const useUpdateCategory = ( onClose: ()=> void, currentPage:number ) => {

    const queryClient = useQueryClient()

    const categoryUpdateMutation = useMutation({
        mutationFn: categoriesActions.updateCategory,
        onSuccess: ( categoryUpdated ) => {
            
            queryClient.setQueryData<ICategoriesResp>(
                [ CATEGORIES_QUERY_KEY, { page: currentPage } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            categories: oldData.categories.map(
                                ( category ) => category._id === categoryUpdated._id ? categoryUpdated : category
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Categoría actualizada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        categoryUpdateMutation
    }
}
