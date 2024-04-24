import { yolostyleApi } from "@/apis"
import { IBrand } from "@/interfaces"

interface NewBrandParams {
    brand: IBrand
}
export const newBrand = async({ brand }:NewBrandParams ):Promise<IBrand> => {

    const { data } = await yolostyleApi.post('/admin/brands', brand )
    return data
}
