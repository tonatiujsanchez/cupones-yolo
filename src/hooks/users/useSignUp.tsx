import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError } from '@/libs'
import { usersActions } from '@/services'


export const useSignUp = () => {
    
    const [msgSuccess, setMsgSuccess] = useState<string>()

    const signUpMutation = useMutation({
        mutationFn: usersActions.signUp,
        onSuccess: ( data:{ msg:string } )=> {
            setMsgSuccess( data.msg )
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })


    const onCleanMsgSuccess = ( ) => {
        setMsgSuccess(undefined)
    }

    return {
        signUpMutation,
        msgSuccess,
        onCleanMsgSuccess
    }
}
