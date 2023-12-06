import { yolostyleApi } from "@/apis"
import { IClientFormData, IClient, IClientsResp } from "@/interfaces"


export const createCoupons = async( client: IClientFormData ):Promise<IClient> => {
    
    const { data } = await yolostyleApi.post<IClient>(`/public/register-client`, client)
    return data
}


export const getClients = async ( page:number ):Promise<IClientsResp> => {

    const params = new URLSearchParams()
    params.append('page', page.toString())

    const { data } = await yolostyleApi.get<IClientsResp>(`/admin/clients`, { params })
    return data
}


export const updateClient = async ( client: IClient ):Promise<IClient> => {
    
    const { data } = await yolostyleApi.put<IClient>(`/admin/clients`, client)
    return data
}