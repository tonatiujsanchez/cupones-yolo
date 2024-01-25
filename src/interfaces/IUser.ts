
export interface IUser {
    _id?     : string
    name     : string
    username : string
    email    : string
    token?   : string

    facebook : boolean
    google   : boolean
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

type IUserRol = 'admin' | 'client'