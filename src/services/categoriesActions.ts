import { yolostyleApi } from '@/apis'
import { ICategoriesResp, ICategory } from '@/interfaces'


interface NewCategoryParams {
    category: ICategory
}
export const newCategory = async({ category }:NewCategoryParams ):Promise<ICategory> => {

    const { data } = await yolostyleApi.post('/admin/categories', category )
    return data
}


interface GetCategoriesParams {
    page: number
}
export const getCategories = async({ page }:GetCategoriesParams):Promise<ICategoriesResp> => {
    
    const params = new URLSearchParams()
    params.append('page', page.toString() )

    const { data } = await yolostyleApi.get('/admin/categories', { params })
    return data
} 