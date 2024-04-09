import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { productsActions } from '@/services'


export const usePostProduct = () => {
    
    const queryProduct = useQueryClient()

    const productPostMutation = useMutation({
        mutationFn: productsActions.newProduct,
        onSuccess: ( newProduct )=> {
            
            // Agregar el producto agregado al cache

            if( newProduct.active ) {
                toastSuccess('Producto publicado')
            }else {
                toastSuccess('Producto guardado')
            }
            console.log(newProduct)
            
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
