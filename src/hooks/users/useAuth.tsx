import { useContext } from 'react'
import { AuthContext } from '@/context'
import { useMutation } from '@tanstack/react-query'
import { usersActions } from '@/services'
import { AxiosError } from 'axios'
import { toastError } from '@/libs'
import { useRouter } from 'next/router'



export const useAuth = () => {
    
    const { login, status, user } = useContext( AuthContext )
    const router = useRouter()
    
    const loginMutation = useMutation({
        mutationFn: usersActions.login,
        onSuccess: ({ token, user })=> {
            login( token, user )
            
            const destination = router.query.p?.toString() || '/'
            router.replace(destination)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })

    
    return {
        loginMutation,
        status,
        user
    }
}
