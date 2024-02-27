import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { sectionsActions } from '@/services'
import { SECTIONS_QUERY_KEY } from '@/constants'
import { ISectionsResp } from '@/interfaces'

export const useUpdateSection = ( onClose: ()=> void, currentPage: number ) => {
  
    const queryClient = useQueryClient()

    const sectionUpdateMutation = useMutation({
        mutationFn: sectionsActions.updateSection,
        onSuccess: ( sectionUpdated ) => {

            queryClient.setQueryData<ISectionsResp>(
                [ SECTIONS_QUERY_KEY, { page: currentPage } ],
                ( oldData )=> {
                    if( oldData ){
                        return {
                            ...oldData,
                            sections: oldData.sections.map(
                                ( section ) => section._id === sectionUpdated._id ? sectionUpdated : section
                            )
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Seción actualizada')
            onClose()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
  
    return {
        sectionUpdateMutation
    }
}
