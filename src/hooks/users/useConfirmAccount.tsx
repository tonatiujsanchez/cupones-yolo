import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError } from '@/libs'
import { usersActions } from '@/services'


export const useConfirmAccount = () => {

    const confirmAccountMutation = useMutation({
        mutationFn: usersActions.confirmAccount,
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        confirmAccountMutation
    }
}
