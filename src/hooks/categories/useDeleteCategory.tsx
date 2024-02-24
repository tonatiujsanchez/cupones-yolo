import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { categoriesActions } from '@/services'
import { CATEGORIES_QUERY_KEY } from '@/constants'
import { ICategoriesResp } from '@/interfaces'

interface Props {
    onClose    : ()=> void
    currentPage: number
}
export const useDeleteCategory = ({ onClose, currentPage }:Props ) => {

    const queryClient = useQueryClient()
    
    const categoryDeleteMutation = useMutation({
        mutationFn: categoriesActions.deleteCategory,
        onSuccess: ( categoryDeleted ) => {
            queryClient.setQueryData<ICategoriesResp>(
                [ CATEGORIES_QUERY_KEY, { page: currentPage } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            categories: oldData.categories.filter(
                                ( category ) => category._id !== categoryDeleted._id
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Categoría eliminada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })

    
    return {
        categoryDeleteMutation
    }
}
