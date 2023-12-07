import { toast } from 'sonner'

export const toastSuccess = ( title:string, description = '' ) => {
    return toast.success(title, { description })
}

export const toastError = ( title:string, description = '' ) => {
    return toast.error(title, { description })
}

export const toastBasic = ( title:string, description = '' ) => {
    return toast(title, { description })
}
