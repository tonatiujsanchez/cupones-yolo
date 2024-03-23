import { yolostyleApi } from "@/apis"
import { IImage } from "@/interfaces"

interface UploadImageParams {
    formData: FormData
}
export const uploadImage = async({ formData }:UploadImageParams):Promise<IImage> => {
    
    const { data } = await yolostyleApi.post('/shared/images/upload', formData)
    return data
} 

