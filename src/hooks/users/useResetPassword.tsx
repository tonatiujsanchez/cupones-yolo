import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError } from '@/libs'
import { usersActions } from '@/services'


export const useResetPassword = () => {

    const [msg, setMsg] = useState<string>()

    
    const resetPasswordMutation = useMutation({
        mutationFn: usersActions.resetPassword,
        onSuccess: ( data )=> {
            setMsg(data.msg)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        resetPasswordMutation,
        msg
    }
}
