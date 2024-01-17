import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'


export const useGetCouponSettingsPage = () => {
    
    const couponSettingsPageQuery = useQuery({
        queryKey: ['couponSettingsPage'],
        queryFn: ()=> couponActions.getCouponSettingsPage(),
        staleTime: 1000 * 60 * 60,
    })
    
    return {
        couponSettingsPageQuery
    }
}
