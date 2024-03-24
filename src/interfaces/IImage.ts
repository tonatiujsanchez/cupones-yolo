import { IUser } from "."

export type ISectionImage = 'products' | 'covers' | 'users'

export interface IImage {
    _id?    : string

    publicId: string
    filename: string
    originalFilename: string
    url     : string
    title   : null | string
    alt     : null | string
    width   : number
    height  : number

    size    : number
    format  : string
    section : ISectionImage
    user    : string | IUser

    createdAt?: string
    updatedAt?: string
}

export interface IImagesResp {
    currentPage  : number,
    totalPages   : number,
    pageSize     : number,
    totalImages: number,
    images       : IImage[],
}