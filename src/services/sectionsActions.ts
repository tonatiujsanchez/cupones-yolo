import { yolostyleApi } from '@/apis'
import { ISection, ISectionsResp } from '@/interfaces'


interface AddNewSectionParams {
    section: ISection
}
export const addNewSection = async({ section }:AddNewSectionParams ):Promise<ISection> => {

    const { data } = await yolostyleApi.post('/admin/sections', section )
    return data
}


interface GetSectionsParams {
    page: number
}
export const getSections = async({ page }:GetSectionsParams):Promise<ISectionsResp> => {

    const params = new URLSearchParams()
    params.append('page', page.toString())

    const { data } = await yolostyleApi.get('/admin/sections', { params } )
    return data
}


interface UpdateSectionParams {
    section: ISection
}
export const updateSection = async({ section }: UpdateSectionParams):Promise<ISection> => {

    const { data } = await yolostyleApi.put('/admin/sections', section )
    return data
} 