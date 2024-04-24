import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from '@/libs'
import { brandsActions } from '@/services'
import { BRANDS_QUERY_KEY } from '@/constants'
import { IBrandsResp } from '@/interfaces'

interface Props {
    onClose    : ()=> void
    currentPage: number
}
export const useDeleteBrand = ({ onClose, currentPage }:Props) => {

    const queryClient = useQueryClient()
    
    const brandDeleteMutation = useMutation({
        mutationFn: brandsActions.deleteBrand,
        onSuccess: ( brandDeleted ) => {
            
            queryClient.setQueryData<IBrandsResp>(
                [ BRANDS_QUERY_KEY, { page: currentPage } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            brands: oldData.brands.filter(
                                ( brand ) => brand._id !== brandDeleted._id
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Marca eliminada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        brandDeleteMutation
    }
}
