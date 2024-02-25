import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { categoriesActions } from '@/services'
import { CATEGORIES_QUERY_KEY } from '@/constants'

import { ICategoriesResp } from '@/interfaces'


export const usePostCategory = ( reset:()=>void ) => {

    const queryClient = useQueryClient()

    const categoryPostMutation = useMutation({
        mutationFn: categoriesActions.newCategory,
        onSuccess: ( newCategory ) => {
            
            queryClient.setQueryData<ICategoriesResp>(
                [ CATEGORIES_QUERY_KEY, { page: 1 } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            categories: [ ...oldData.categories, newCategory ],
                            totalCategories: oldData.totalCategories + 1
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Categoría agregada')
            reset()
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
