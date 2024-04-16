import { yolostyleApi } from '@/apis'
import { IProduct, IProductsResp } from '@/interfaces'


interface NewProductParams {
    product: IProduct
}
export const newProduct = async({ product }:NewProductParams):Promise<IProduct> => {
    
    const { data } = await yolostyleApi.post<IProduct>('/admin/products', product)
    return data
} 


interface GetProductParams {
    idProduct: string
}
export const getProduct = async({ idProduct }:GetProductParams):Promise<IProduct> => {
   
    const { data } = await yolostyleApi.get<IProduct>(`/admin/products/${ idProduct }`)
    return data
}


interface GetProductsParams {
    page       : number,
    searchTerm :string
}
export const getProducts = async({ page, searchTerm }:GetProductsParams):Promise<IProductsResp> => {
    
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('searchTerm', searchTerm)

    const { data } = await yolostyleApi.get<IProductsResp>('/admin/products', { params })
    return data
}


interface DeleteProductParams {
    idProduct: string
}
export const deleteProduct = async({ idProduct }:DeleteProductParams):Promise<IProduct> => {

    const params = new URLSearchParams()
    params.append('id', idProduct)

    const { data } = await yolostyleApi.delete<IProduct>('/admin/products', { params })
    return data
}