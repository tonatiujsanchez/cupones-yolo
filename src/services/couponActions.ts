import { yolostyleApi } from "@/apis"
import { IClient } from "@/interfaces"


export const createCoupons = async():Promise<IClient> => {

    const { data } = await yolostyleApi<IClient>(`/public/register-client`)
    console.log(data)
    return data
}