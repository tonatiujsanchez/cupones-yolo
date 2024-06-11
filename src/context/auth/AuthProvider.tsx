import { FC, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { AuthContext, authReducer } from './'
import { useCheckAuth } from '@/hooks'
import { AuthStatus, COOKIE_AUTH_KEY } from '@/constants'
import { IUserAuth } from '@/interfaces'
import { LoadingYolostyle } from '@/components'
import { yolostyleApi } from '@/apis'


interface Props {
    children: JSX.Element
}

export interface AuthState {
    status: AuthStatus
    user? : IUserAuth
}

const AUTH_INITIAL_STATE: AuthState = {
    status: AuthStatus.CHECKING,
    user  : undefined ,
}


export const AuthProvider: FC<Props> = ({ children }) => {

    const router = useRouter()
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

    useEffect(()=>{
        checkToken()
    },[])

    const checkToken = async () => {

        if( !Cookies.get(COOKIE_AUTH_KEY) ){ return }

        try {
            const { data } = await yolostyleApi.get('/auth/validate-session')
            const { token, user } = data
            
            Cookies.set(COOKIE_AUTH_KEY, token)            
            login( token, user )
        
        } catch (error) {
            logout()
        }
    }

    const login = ( token:string, user:IUserAuth )=> {
        Cookies.set(COOKIE_AUTH_KEY, token)
        dispatch({ type: '[Auth] - Login', payload: user })
    }

    const logout = () => {
        dispatch({ type: '[Auth] - Logout' })
        Cookies.remove( COOKIE_AUTH_KEY )
        router.reload()
    }

    // useCheckAuth({ login, logout })

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
