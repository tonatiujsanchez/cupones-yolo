import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { couponActions } from '@/services'
import { REGISTERS_QUERY_KEY } from '@/constants'
import { IClient, IClientsResp, ICouponsSentOptions } from '@/interfaces'


interface IUpdatedClient {
    client     : IClient
    currentPage:number
    searchTerm :string
    couponsSent: ICouponsSentOptions
    month      :string
    year       :string
}

interface IUpdatedClientContext extends IUpdatedClient { 
    oldClient:IClient, 
}
export const useUpdateClient = () => {
    
    const queryClient = useQueryClient()

    const updateClient = useMutation({
        onMutate: ({ client, currentPage, searchTerm, couponsSent, month, year }:IUpdatedClient )=> {

            let oldClientToUpdate:IClient | undefined;

            queryClient.setQueryData<IClientsResp>(
                [REGISTERS_QUERY_KEY, { page: currentPage, searchTerm, couponsSent, month, year }],
                ( oldData ) => {
                    if( oldData ){
                        return {
                            ...oldData,
                            clients: oldData.clients.map(
                                oldClient => {
                                    if( oldClient._id === client._id ){
                                        oldClientToUpdate = oldClient
                                        return client
                                    }
                                   return oldClient
                                }
                            ),
                        }
                    }
                    return oldData
                }
            )
            return { 
                oldClient: oldClientToUpdate ? oldClientToUpdate : client, 
                currentPage,
                searchTerm,
                couponsSent,
                month,
                year,
            }
        },
        mutationFn: ({ client })=> couponActions.updateClient( client ),
        onSuccess: ( updatedClient )=> {
            console.log('Cliente actualizado...')
            console.log( updatedClient )
        },
        onError: ( error:AxiosError<{ msg:string }>, _variables, context )=> {

            const { oldClient, currentPage, searchTerm, couponsSent, month, year } = context as IUpdatedClientContext

            queryClient.setQueryData<IClientsResp>(
                [REGISTERS_QUERY_KEY, { page: currentPage, searchTerm, couponsSent, month, year }],
                ( oldData )=> {
                    if( oldData ){
                        return {
                            ...oldData,
                            clients: oldData.clients.map( 
                                client => client._id === oldClient._id ? oldClient : client
                            ),
                        }
                    }
                    return oldData
                }
            )

            console.log('==== Hubo un error al actualizar los cupones ====')
            const { msg } = error.response!.data
            console.log(msg)
        }
    })


    return {
        updateClient
    }
}
