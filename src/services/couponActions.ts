import { yolostyleApi } from "@/apis"
import { ClientFormData, IClient } from "@/interfaces"


export const createCoupons = async( client: ClientFormData ):Promise<IClient> => {
    
    const { data } = await yolostyleApi.post<IClient>(`/public/register-client`, client)
    return data
}