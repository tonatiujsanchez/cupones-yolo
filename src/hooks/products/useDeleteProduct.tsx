import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { productsActions } from '@/services'
import { PRODUCTS_QUERY_KEY } from '@/constants'
import { IProductsResp } from '@/interfaces'

interface Props {
    currentPage: number
    searchTerm : string
    onClose    : ()=> void
}
export const useDeleteProduct = ({ currentPage, searchTerm, onClose }:Props) => {
    
    const queryClient = useQueryClient()


    const productDeleteMutation = useMutation({
        mutationFn: productsActions.deleteProduct,
        onSuccess: ( productDeleted )=> {

            queryClient.setQueryData<IProductsResp>(
                [ PRODUCTS_QUERY_KEY, { page: currentPage, searchTerm } ],
                ( oldData )=> {
                    if( oldData ){
                        return {
                            ...oldData,
                            products: oldData.products.filter(
                                product => product._id !== productDeleted._id
                            ),
                            totalProducts: oldData.totalProducts - 1,
                            pageSize: oldData.pageSize - 1,
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Producto eliminado')
            onClose()
        },
        onError:( error: AxiosError<{ msg: string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
        
    })

    return {
        productDeleteMutation
    }
}
