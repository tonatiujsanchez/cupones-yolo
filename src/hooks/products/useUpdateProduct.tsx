import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { productsActions } from '@/services'
import { PRODUCTS_QUERY_KEY } from '@/constants'
import { IProduct, IProductsResp } from '@/interfaces'


interface Props {
    page?      : number
    searchTerm?: string
}
export const useUpdateProduct = ({ page, searchTerm }:Props) => {

    const queryClient = useQueryClient()
    
    const productUpdateMutation = useMutation({
        mutationFn: productsActions.updateProduct,
        onSuccess: ( updatedProduct ) => {
            
            // Agregar el nuevo producto a la lista en el cache: PRODUCTS_QUERY_KEY, { filters }
            queryClient.setQueryData<IProductsResp>(
                [ PRODUCTS_QUERY_KEY, { page: page, searchTerm } ],
                ( oldData )=> {
                    if( oldData ){
                        return {
                            ...oldData,
                            products: oldData.products.map(
                                ( product ) => product._id === updatedProduct._id ? updatedProduct : product
                            )
                        }
                    }
                }
            )

            queryClient.setQueryData<IProduct>(
                [ PRODUCTS_QUERY_KEY, { idProduct: updatedProduct._id } ],
                (oldData) => {
                    console.log(oldData)
                    if (oldData) {
                        return {
                            ...updatedProduct
                        }
                    }
                }
            )

            toastSuccess('Producto actualizado')
        },
        onError:( error: AxiosError<{ msg: string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        productUpdateMutation
    }
}
