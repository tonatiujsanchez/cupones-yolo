import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AuthContext } from '@/context'
import { usersActions } from '@/services'
import { toastError, toastSuccess } from '@/libs'



export const useAuth = () => {
    
    const { login, logout, user, status } = useContext( AuthContext )
    const router = useRouter()
    
    const loginMutation = useMutation({
        mutationFn: usersActions.login,
        onSuccess: ({ token, user })=> {
            login( token, user )
            
            const destination = router.query.p?.toString() || '/'
            router.replace(destination)

            toastSuccess(`¡Bienvenido ${ user.name }!`)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })


    return {
        loginMutation,
        logout,
        user,
        status
    }
}
