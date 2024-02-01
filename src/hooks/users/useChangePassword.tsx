import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { usersActions } from "@/services"
import { toastError } from "@/libs"


export const useChangePassword = () => {
    
    const [msgSuccess, setMsgSuccess] = useState<string>()

    const changePasswordMutation = useMutation({
        mutationFn: usersActions.changePassword,
        onSuccess: ( data )=> {
            setMsgSuccess( data.msg )
        },
        onError: ( error:AxiosError<{ msg: string }> ) =>{
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        changePasswordMutation,
        msgSuccess
    }
}
