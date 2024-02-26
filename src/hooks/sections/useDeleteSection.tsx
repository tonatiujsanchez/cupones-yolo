import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { sectionsActions } from '@/services'
import { ISectionsResp } from '@/interfaces'
import { SECTIONS_QUERY_KEY } from '@/constants'


interface Props {
    onClose    : ()=> void
    currentPage: number
}
export const useDeleteSection = ({ onClose, currentPage }:Props) => {
    
    const queryClient = useQueryClient()

    const sectionDeleteMutation = useMutation({
        mutationFn: sectionsActions.deleteSection,
        onSuccess: ( sectionDeleted )=> {
            queryClient.setQueryData<ISectionsResp>(
                [ SECTIONS_QUERY_KEY, { page: currentPage } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            sections: oldData.sections.filter(
                                ( section ) => section._id !== sectionDeleted._id
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Sección eliminada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })


    return {
        sectionDeleteMutation
    }
}
