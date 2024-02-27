import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { sizesActions } from '@/services'
import { SIZES_QUERY_KEY } from '@/constants'
import { ISizesResp } from '@/interfaces'

export const usePostSize = ( reset:()=>void ) => {
    
    const queryClient = useQueryClient()

    const sizePostMutation = useMutation({
        mutationFn: sizesActions.addNewSize,
        onSuccess: ( newSize ) => {

            queryClient.setQueryData<ISizesResp>(
                [ SIZES_QUERY_KEY, { page: 1 } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            sizes: [ ...oldData.sizes, newSize ],
                            totalSizes: oldData.totalSizes + 1
                        }
                    }
                    return oldData
                }
            )
            toastSuccess('Talla agregada')
            reset()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })

    return {
        sizePostMutation
    }
}
