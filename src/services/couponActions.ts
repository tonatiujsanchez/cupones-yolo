import axios from "axios"

import { ICoupon } from "@/interfaces"


export const createCoupons = async():Promise<ICoupon> => {

    const { data } = await axios.post<ICoupon>(`${ process.env.NEXT_PUBLIC_BASE_URL }/api/public/register-client`)
    console.log(data)
    return data
}