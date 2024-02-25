import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs'
import { sectionsActions } from '@/services'
import { SECTIONS_QUERY_KEY } from '@/constants'

import { ISectionsResp } from '@/interfaces'


export const usePostSection = ( reset:()=>void ) => {

    const queryClient = useQueryClient()

    
    const sectionPostMutation = useMutation({
        mutationFn: sectionsActions.addNewSection,
        onSuccess : ( newSection ) => {
            queryClient.setQueryData<ISectionsResp>(
                [ SECTIONS_QUERY_KEY, { page: 1 } ],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            sections: [ ...oldData.sections, newSection ],
                            totalSections: oldData.totalSections + 1
                        }
                    }
                    return oldData
                }
            )

            toastSuccess('Seccción agregada')
            reset()
        },
        onError: ( error:AxiosError<{ msg:string }> ) => {
            const { msg } = error.response!.data
            toastError( msg )
        }
    })
    
    return {
        sectionPostMutation
    }
}
