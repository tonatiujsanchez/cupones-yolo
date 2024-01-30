import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { usersActions } from '@/services'


export const useConfirmAccount = () => {

    const confirmAccountMutation = useMutation({
        mutationFn: usersActions.confirmAccount,
        onError: ( error:AxiosError<{ msg:string }> )=> {
            console.log(error)
        }
    })
    
    return {
        confirmAccountMutation
    }
}
