import { yolostyleApi } from '@/apis'
import { ICategory } from '@/interfaces'


interface NewCategoryParams {
    category: ICategory
}
export const newCategory = async({ category }:NewCategoryParams ):Promise<ICategory> => {

    const { data } = await yolostyleApi.post('/admin/categories', category )
    return data
}