import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError } from '@/libs'
import { usersActions } from '@/services'


export const useCheckPasswordToken = () => {

    const [msgSuccess, setMsgSuccess] = useState<string>()
    const router = useRouter()

    
    const checkPasswordTokenMutation = useMutation({
        mutationFn: usersActions.checkPasswordToken,
        onSuccess: ( data )=> {
            setMsgSuccess(data.msg)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
            router.replace('/')
        }
    })
    return {
        checkPasswordTokenMutation,
        msgSuccess
    }
}
