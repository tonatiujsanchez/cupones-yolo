import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { productsActions } from '@/services'
import { toastError, toastSuccess } from '@/libs'


export const useUpdateProduct = () => {
    
    const productUpdateMutation = useMutation({
        mutationFn: productsActions.updateProduct,
        onSuccess: ( updatedProduct ) => {

            toastSuccess('Producto actualizado')
            // TODO: Agregar el nuevo producto a la lista en el cache: PRODUCTS_QUERY_KEY, { filters }

            console.log(updatedProduct)
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
