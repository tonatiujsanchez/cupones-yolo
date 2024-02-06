export interface IRoute {
    _id?  : string

    title : string
    slug? : string
    
    active: boolean
    status: boolean

    createdAt? : string
    updatedAt? : string
}


