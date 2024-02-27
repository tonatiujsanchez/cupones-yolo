import { yolostyleApi } from '@/apis'
import { ISize, ISizesResp } from '@/interfaces'


interface AddNewSizeParams {
    size: ISize
}
export const addNewSize = async({ size }:AddNewSizeParams) => {
    
    const { data } = await yolostyleApi.post<ISize>('/admin/sizes', size )
    return data
}


interface GetSizesParams {
    page: number
}
export const getSizes = async({ page }:GetSizesParams):Promise<ISizesResp> => {

    const params = new URLSearchParams()
    params.append('page', page.toString())

    const { data } = await yolostyleApi.get<ISizesResp>('/admin/sizes', { params } )
    return data
}


interface UpdateSizeParams {
    size: ISize
}
export const updateSize = async({ size }:UpdateSizeParams):Promise<ISize> => {
    
    const { data } = await yolostyleApi.put<ISize>('/admin/sizes', size)
    return data
}

interface DeleteSizeParams {
    idSize: string
}
export const deleteSize = async({ idSize }:DeleteSizeParams):Promise<ISize> => {

    const params = new URLSearchParams()
    params.append('idSize', idSize)

    const { data } = await yolostyleApi.delete<ISize>('/admin/sizes',{ params })
    return data
}