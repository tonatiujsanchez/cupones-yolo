

import { IUserAuth } from '@/interfaces'
import { AuthState } from './'
import { AuthStatus } from '@/constants'


type AuthActionType =
    | { type: '[Auth] - Login', payload: IUserAuth  }
    | { type: '[Auth] - Logout' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                status: AuthStatus.AUTHENTICATED,
                user: action.payload
            }
        default:
            return state
    }
}