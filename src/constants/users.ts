
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