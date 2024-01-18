import { useQuery } from '@tanstack/react-query'
import { couponActions } from '@/services'
import { COUPONS_SETTINGS_PAGE_QUERY_KEY } from '@/constants'


export const useGetCouponSettingsPage = () => {
    
    const couponSettingsPageQuery = useQuery({
        queryKey: [ COUPONS_SETTINGS_PAGE_QUERY_KEY ],
        queryFn: ()=> couponActions.getCouponSettingsPage(),
        staleTime: 1000 * 60 * 60,
    })
    
    return {
        couponSettingsPageQuery
    }
}
