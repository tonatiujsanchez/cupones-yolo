
export interface IUser {
    _id?     : string
    name     : string
    username : string
    email    : string
    token?   : string

    google   : boolean
    facebook : boolean
    x        : boolean
    confirmed: boolean

    password : string
    role     : IUserRol
    photo?   : string

    active   : boolean
    status   : boolean

    createdAt?: string
    updatedAt?: string
}

export type IUserRol = 'super_admin' | 'admin' | 'client'


export interface IUserAuth {
    uid      : string
    name     : string
    username : string
    email    : string
    role     : IUserRol
    photo?   : string
}
