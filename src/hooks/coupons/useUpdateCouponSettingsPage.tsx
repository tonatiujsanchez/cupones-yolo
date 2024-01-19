import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { couponActions } from '@/services'
import { COUPONS_SETTINGS_PAGE_QUERY_KEY, PUBLIC_ROUTES_QUERY_KEY,  } from '@/constants'
import { IRoute } from '@/interfaces'



export const useUpdateCouponSettingsPage = () => {

    const queryClient = useQueryClient()
    
    const updateCouponSettingsPage = useMutation({
        mutationFn: couponActions.updateCouponSettingsPage,
        onSuccess: ( couponSettingsPage )=> {
            queryClient.setQueryData(
                [ COUPONS_SETTINGS_PAGE_QUERY_KEY ],
                ()=> couponSettingsPage
            )

            queryClient.setQueryData(
                [ PUBLIC_ROUTES_QUERY_KEY ],
                (routes:IRoute[])=> {

                    const existRoute = routes.find( route => route.slug === couponSettingsPage.route.slug )
                    if( existRoute && existRoute.active === couponSettingsPage.route.active ){
                        return routes
                    }

                    if(couponSettingsPage.route.active){
                        return [ ...routes, couponSettingsPage.route ]
                    }else {
                        return routes.filter( route => route.slug !== couponSettingsPage.route.slug )
                    }
                }
            )
            toastSuccess('Configuraciones guardadas correctamente')
        },
        onError: (error:AxiosError<{ msg:string }>,)=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    return {
        updateCouponSettingsPage
    }
}
