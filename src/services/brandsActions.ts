import { yolostyleApi } from "@/apis"
import { IBrand, IBrandsResp } from "@/interfaces"

interface NewBrandParams {
    brand: IBrand
}
export const newBrand = async({ brand }:NewBrandParams ):Promise<IBrand> => {

    const { data } = await yolostyleApi.post('/admin/brands', brand )
    return data
}


interface GetBrandsParams {
    page: number
}
export const getBrands = async({ page }:GetBrandsParams ):Promise<IBrandsResp> => {
    
    const params = new URLSearchParams()
    params.append('page', page.toString())

    const { data } = await yolostyleApi.get('/admin/brands', { params })
    return data
}


interface UpdateBrandParams {
    brand: IBrand
}
export const updateBrand = async({ brand }:UpdateBrandParams):Promise<IBrand> => {

    const { data } = await yolostyleApi.put('/admin/brands', brand )
    return data
}


interface DeleteBrandParams {
    idBrand: string
}
export const deleteBrand = async({ idBrand }:DeleteBrandParams):Promise<IBrand> => {

    const params = new URLSearchParams()
    params.append('idBrand', idBrand)

    const { data } = await yolostyleApi.delete<IBrand>('/admin/brands', { params })
    return data
} 
