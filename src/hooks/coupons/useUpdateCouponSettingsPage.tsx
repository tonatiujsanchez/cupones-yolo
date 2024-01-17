import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { couponActions } from '@/services'



export const useUpdateCouponSettingsPage = () => {

    const queryClient = useQueryClient()
    
    const updateCouponSettingsPage = useMutation({
        mutationFn: couponActions.updateCouponSettingsPage,
        onSuccess: ( couponSettingsPage )=> {
            queryClient.setQueryData(
                ['couponSettingsPage'],
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
