import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { couponActions } from '@/services'

import { IClient } from '@/interfaces'


export const useRegisterClient = () => {

    const [ clientRegistered, setClientRegistered ] = useState<IClient>()

    const clientMutation = useMutation({
        mutationFn: couponActions.createCoupons,
        onSuccess: ( data, _variables, context )=>{
            setClientRegistered(data)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            console.log('Hubo un error...')
            const { msg } = error.response!.data
            console.log(msg)
        }
    })

    const onCleanClientRegistered = () => {
        setClientRegistered(undefined)
    }

    return {
        clientMutation,
        clientRegistered,
        onCleanClientRegistered
    }
}
