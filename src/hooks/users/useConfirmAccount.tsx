import { useState } from 'react'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toastError } from '@/libs'
import { usersActions } from '@/services'


export const useConfirmAccount = () => {

    const [msg, setMsg] = useState<string>()
    const router = useRouter()


    const confirmAccountMutation = useMutation({
        mutationFn: usersActions.confirmAccount,
        onSuccess: (data)=> {
            setMsg(data.msg)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
            router.replace('/')
        }
    })
    
    return {
        confirmAccountMutation,
        msg
    }
}
