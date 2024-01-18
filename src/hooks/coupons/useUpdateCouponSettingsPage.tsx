import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { couponActions } from '@/services'
import { COUPONS_SETTINGS_PAGE_QUERY_KEY } from '@/constants'



export const useUpdateCouponSettingsPage = () => {

    const queryClient = useQueryClient()
    
    const updateCouponSettingsPage = useMutation({
        mutationFn: couponActions.updateCouponSettingsPage,
        onSuccess: ( couponSettingsPage )=> {
            queryClient.setQueryData(
                [ COUPONS_SETTINGS_PAGE_QUERY_KEY ],
                ()=> couponSettingsPage
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
