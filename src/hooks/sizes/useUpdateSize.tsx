import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { sizesActions } from '@/services'
import { SIZES_QUERY_KEY } from '@/constants'
import { ISizesResp } from '@/interfaces'

export const useUpdateSize = ( onClose: ()=> void, currentPage: number ) => {

    const queryClient = useQueryClient()
    
    const sizeUpdateMutation = useMutation({
        mutationFn: sizesActions.updateSize,
        onSuccess: ( sizeUpdated )=> {

            queryClient.setQueryData<ISizesResp>(
                [ SIZES_QUERY_KEY, { page: currentPage }],
                ( oldData )=> {

                    if( oldData ){
                        return {
                            ...oldData,
                            sizes: oldData.sizes.map(
                                ( size ) => size._id === sizeUpdated._id ? sizeUpdated : size
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Talla actualizada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        sizeUpdateMutation
    }
}
