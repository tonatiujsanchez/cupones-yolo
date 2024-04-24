import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { brandsActions } from '@/services'
import { toastError, toastSuccess } from '@/libs'
import { BRANDS_QUERY_KEY } from '@/constants'
import { IBrandsResp } from '@/interfaces'


export const useUpdateBrand = ( onClose: ()=> void, currentPage: number ) => {

    const queryClient = useQueryClient()

    const brandUpdateMutation = useMutation({
        mutationFn: brandsActions.updateBrand,
        onSuccess: ( brandUpdated ) => {

            queryClient.setQueryData<IBrandsResp>(
                [ BRANDS_QUERY_KEY, { page: currentPage } ],
                ( oldData )=> {
                    if( oldData ){
                        return {
                            ...oldData,
                            brands: oldData.brands.map(
                                ( brand ) => brand._id === brandUpdated._id ? brandUpdated : brand
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Marca actualizada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })


    return {
        brandUpdateMutation
    }
}
