import { IUser } from "."

export type ISectionImage = 'products' | 'covers' | 'users'

export interface IImage {
    _id?    : string

    publicId: string
    url     : string
    title?  : string
    alt?    : string | null
    width   : number
    height  : number

    size    : number
    format  : string
    section : ISectionImage
    user    : string | IUser

    createdAt?: string
    updatedAt?: string
}