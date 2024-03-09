import { toast }  from 'sonner'

type Position = 
    | 'top-center' 
    | 'top-right' 
    | 'top-left' 
    | 'bottom-center' 
    | 'bottom-right' 
    | 'bottom-left' 
    | undefined 

export const toastSuccess = ( title:string, description = '', position:Position='top-center' ) => {
    return toast.success(title, { description, position })
}

export const toastError = ( title:string, description = '', position:Position='top-center' ) => {
    return toast.error(title, { description, position })
}

export const toastBasic = ( title:string, description = '', position:Position='top-center' ) => {
    return toast(title, { description, position })
}
