import { yolostyleApi } from '@/apis'
import { IRoute } from '@/interfaces'


export const getPublicRoutes = async() => {
    const { data } = await yolostyleApi.get<IRoute[]>('/public/routes')
    return data
}
