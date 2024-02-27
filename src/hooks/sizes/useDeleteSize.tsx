import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { SIZES_QUERY_KEY } from '@/constants'
import { sizesActions } from '@/services'
import { ISizesResp } from '@/interfaces'

interface Props {
    onClose    : ()=> void
    currentPage: number
}
export const useDeleteSize = ({ currentPage, onClose }:Props) => {
    
    const queryClient = useQueryClient()

    const sizeDeleteMutation = useMutation({
        mutationFn: sizesActions.deleteSize,
        onSuccess: ( sizeDeleted )=> {
            queryClient.setQueryData<ISizesResp>(
                [ SIZES_QUERY_KEY, { page: currentPage } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            sizes: oldData.sizes.filter(
                                ( size ) => size._id !== sizeDeleted._id
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Talla eliminada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })

    
    return {
        sizeDeleteMutation
    }
}
