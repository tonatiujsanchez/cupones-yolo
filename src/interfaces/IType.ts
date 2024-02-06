export interface IType {
    _id?       : string

    value      : string
    label      : string
    cover      : string | null

    active     : boolean
    status     : boolean

    createdAt? : string
    updatedAt? : string
}