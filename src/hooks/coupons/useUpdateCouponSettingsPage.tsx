import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { couponActions } from '@/services'



export const useUpdateCouponSettingsPage = () => {
    
    const updateCouponSettingsPage = useMutation({
        mutationFn: couponActions.updateCouponSettingsPage,
        onSuccess: ( couponSettingsPage )=> {
            console.log('onSuccess =>', couponSettingsPage)
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
