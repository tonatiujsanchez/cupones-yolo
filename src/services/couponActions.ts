import { yolostyleApi } from "@/apis"
import { IClientFormData, IClient, IClientsResp, ICouponsSentOptions, ICouponsResp, IStatusCouponExchangeOptions } from "@/interfaces"


export const createCoupons = async( client: IClientFormData ):Promise<IClient> => {
    
    const { data } = await yolostyleApi.post<IClient>(`/public/register-client`, client)
    return data
}

export const getClients = async ( page:number, searchTerm:string, couponsSent: ICouponsSentOptions, month :string, year :string ):Promise<IClientsResp> => {

    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('searchTerm', searchTerm)
    params.append('couponsSent', couponsSent)
    params.append('month', month)
    params.append('year', year)

    const { data } = await yolostyleApi.get<IClientsResp>(`/admin/clients`, { params })
    return data
}

export const updateClient = async ( client: IClient ):Promise<IClient> => {
    
    const { data } = await yolostyleApi.put<IClient>(`/admin/clients`, client)
    return data
}



export const getCoupons = async ( page:number, searchTerm:string, exchangeStatus:IStatusCouponExchangeOptions ):Promise<ICouponsResp> => {
    
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('searchTerm', searchTerm)
    params.append('exchangeStatus', exchangeStatus)

    const { data } = await yolostyleApi.get<ICouponsResp>(`/admin/coupons`, { params })
    return data
}
