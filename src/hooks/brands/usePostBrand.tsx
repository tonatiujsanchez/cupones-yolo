import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { brandsActions } from '@/services'
import { BRANDS_QUERY_KEY } from '@/constants'
import { IBrandsResp } from '@/interfaces'

export const usePostBrand = ( reset: ()=> void ) => {
    
    const queryClient = useQueryClient()
    
    const brandPostMutation = useMutation({
        mutationFn: brandsActions.newBrand,
        onSuccess: ( newBrand ) => {
            
            queryClient.setQueryData<IBrandsResp>(
                [ BRANDS_QUERY_KEY, { page: 1 } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            brands: [ ...oldData.brands, newBrand ],
                            totalBrands: oldData.totalBrands + 1
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Nueva marca agregada')
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
