
export interface IUser {
    _id?    : string
    name    : string
    username: string
    email   : string
    password: string
    role    : string
    photo?  : string

    active  : boolean
    status  : boolean

    createdAt?: string
    updatedAt?: string
}