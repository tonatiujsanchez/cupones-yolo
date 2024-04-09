import { yolostyleApi } from "@/apis"
import { IProduct } from "@/interfaces"

interface NewProductParams {
    product: IProduct
}
export const newProduct = async({ product }:NewProductParams):Promise<IProduct> => {
    
    const { data } = await yolostyleApi.post<IProduct>('/admin/products', product)
    return data
} 