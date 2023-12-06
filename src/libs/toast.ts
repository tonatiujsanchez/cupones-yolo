import { toast } from 'sonner'
import { BLACK_COLOR } from '@/constants'

export const toastSuccess = ( title:string, description = '' ) => {
    return toast.success(title, { description })
}

export const toastError = ( title:string, description = '' ) => {
    return toast.error(title, { description })
}

export const toastCustom = ( title:string, description = '' ) => {
    return toast(title, { description })
}
