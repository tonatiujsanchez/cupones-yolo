import { FC, useReducer } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { AuthContext, authReducer } from './'
import { useCheckAuth } from '@/hooks'
import { AuthStatus, COOKIE_AUTH_KEY } from '@/constants'
import { IUserAuth } from '@/interfaces'
import { LoadingYolostyle } from '@/components'


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

    const login = ( token:string, user:IUserAuth )=> {
        Cookies.set(COOKIE_AUTH_KEY, token)
        dispatch({ type: '[Auth] - Login', payload: user })
    }

    const logout = () => {
        Cookies.remove( COOKIE_AUTH_KEY )
        router.reload()
    }

    useCheckAuth({ login, logout })

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
