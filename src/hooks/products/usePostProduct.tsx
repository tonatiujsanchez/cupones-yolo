import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { productsActions } from '@/services'
import { PRODUCTS_QUERY_KEY } from '@/constants'
import { IProductsResp } from '@/interfaces'


export const usePostProduct = () => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const productPostMutation = useMutation({
        mutationFn: productsActions.newProduct,
        onSuccess: ( newProduct )=> {
            
            // Agregar el nuevo producto a la lista en el cache: PRODUCTS_QUERY_KEY, { filters }
            queryClient.setQueryData<IProductsResp>(
                [ PRODUCTS_QUERY_KEY, { page: 1, searchTerm: '' } ],
                ( oldData )=> {
                    if( oldData ){
                        return {
                            ...oldData,
                            products: [
                                newProduct,
                                ...oldData.products,
                            ],
                            totalProducts: oldData.totalProducts + 1,
                            pageSize: oldData.pageSize + 1,
                        }
                    }
                }
            )

            // Agregar el nuevo producto a su propio cache
            queryClient.setQueryData(
                [ PRODUCTS_QUERY_KEY, { idProduct: newProduct._id } ],
                () => newProduct
            )

            if( newProduct.active ) {
                toastSuccess('Producto publicado')
            }else {
                toastSuccess('Producto guardado')
            }

            router.replace(`/dashboard/productos/${ newProduct._id }`)
            
        },
        onError:( error: AxiosError<{ msg: string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        productPostMutation
    }
}
