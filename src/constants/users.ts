import { ISelectOption } from "@/interfaces"

export const USERS_QUERY_KEY = 'users'

export const USER_ROLES = {
    superAdmin: 'super_admin',
    admin     : 'admin',
    client    : 'client'
}

export const USERS_ROLE_OPTIONS = Object.values( USER_ROLES )

export enum AuthStatus {
    CHECKING = 'checking',
    NOTAUTHENTICATED = 'not_authenticated',
    AUTHENTICATED = 'authenticated',
}

export const IS_SERVER = typeof window === 'undefined'

export const COOKIE_AUTH_KEY = IS_SERVER
    ? process.env.COOKIE_AUTH_KEY || ''
    : process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY || ''


// Users in dashboard
export const USERS_PAGE_SIZE = 20


export const USER_ROLES_OPTIONS:ISelectOption[] = [
    {
        value: 'super_admin',
        label: 'Super Admin'
    },
    {
        value: 'admin',
        label: 'Administrador'
    },
    {
        value: 'client',
        label: 'Cliente'
    },
]
