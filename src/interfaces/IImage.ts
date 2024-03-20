import { IUser } from "."

export type ISectionImage = 'products' | 'covers' | 'users'

export interface IImage {
    _id?    : string

    publicId: string
    filename: string
    originalFilename: string
    url     : string
    title?  : string
    alt?    : string
    width   : number
    height  : number

    size    : number
    format  : string
    section : ISectionImage
    user    : string | IUser

    createdAt?: string
    updatedAt?: string
}