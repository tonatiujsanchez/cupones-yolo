import { useMutation } from '@tanstack/react-query'

import { couponActions } from '@/services'


export const useRegisterClient = () => {

    const clientMutation = useMutation({
        mutationFn: couponActions.createCoupons,
        onSuccess: ()=>{
            console.log('Se realizo el registro correctamente.')
        },
        onError: ( error )=> {
            console.log('Hubo un error...')
            console.log(error)
        }
    })

    return {
        clientMutation
    }
}
