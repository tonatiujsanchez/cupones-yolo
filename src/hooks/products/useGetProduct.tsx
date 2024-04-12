import { PRODUCTS_QUERY_KEY } from "@/constants"
import { productsActions } from "@/services"
import { useQuery } from "@tanstack/react-query"


interface Props {
    idProduct: string
}
export const useGetProduct = ({ idProduct }:Props) => {
    
    const productQuery =  useQuery({
        queryKey:[ PRODUCTS_QUERY_KEY, { idProduct } ],
        queryFn: ()=> productsActions.getProduct({ idProduct }),
        staleTime: 1000 * 60 * 60,
    })

    return {
        productQuery
    }
}
