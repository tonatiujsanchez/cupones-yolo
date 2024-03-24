import { yolostyleApi } from "@/apis"
import { IImage, IImagesResp } from "@/interfaces"

interface UploadImageParams {
    formData: FormData
}
export const uploadImage = async({ formData }:UploadImageParams):Promise<IImage> => {
    
    const { data } = await yolostyleApi.post('/shared/images/upload', formData)
    return data
} 


interface GetImagesParams {
    section: string
    page   : number
    count? : number
}
export const getImages = async({ section, page, count }:GetImagesParams):Promise<IImagesResp> => {
    
    const params = new URLSearchParams()
    params.append('section', section )
    params.append('page', page.toString() )

    if( count ){
        params.append('count', count.toString() )
    }

    const { data } = await  yolostyleApi.get<IImagesResp>('/admin/images', { params })
    return data
}

