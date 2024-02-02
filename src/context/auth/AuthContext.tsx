import { createContext } from 'react'
import { IUserAuth } from '@/interfaces'
import { AuthStatus } from '@/constants'


interface ContextProps {
    status: AuthStatus
    user?: IUserAuth

    // Methods
    login: ( token:string, user:IUserAuth ) => void
    logout: () => void
}


export const AuthContext = createContext({} as ContextProps)