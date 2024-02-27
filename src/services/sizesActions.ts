import { yolostyleApi } from '@/apis'
import { ISize, ISizesResp } from '@/interfaces'


interface AddNewSizeParams {
    size: ISize
}
export const addNewSize = async({ size }:AddNewSizeParams) => {
    
    const { data } = await yolostyleApi.post('/admin/sizes', size )
    return data
}


interface GetSizesParams {
    page: number
}
export const getSizes = async({ page }:GetSizesParams):Promise<ISizesResp> => {

    const params = new URLSearchParams()
    params.append('page', page.toString())

    const { data } = await yolostyleApi.get('/admin/sizes', { params } )
    return data
}

