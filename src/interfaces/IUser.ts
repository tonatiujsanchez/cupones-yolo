
export interface IUser {
    _id?     : string
    name     : string
    username : string
    email    : string
    token    : string | null

    google   : boolean
    facebook : boolean
    x        : boolean
    confirmed: boolean

    password : string
    role     : IUserRol
    photo    : string | null

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
    photo?   : string | null
}


export type IUsersResp = {
    currentPage : number,
    totalPages  : number
    totalUsers  : number
    pageSize    : number
    users       : IUser[]
}
