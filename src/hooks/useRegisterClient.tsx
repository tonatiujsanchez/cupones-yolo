import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { couponActions } from '@/services'

import { IClient } from '@/interfaces'


export const useRegisterClient = () => {

    const [ clientRegistered, setClientRegistered ] = useState<IClient>({
        name: 'Tonatiuj Sánchez',
        phone: 7571250112,
        email: null,
        birthdate : new Date('1938-05-07T00:00:00.000Z'),
        receivePromotions: true,
        registeredAt:new Date('2023-11-22T18:05:38.433Z'), 
        coupons: [],
        couponsSent: false,
        status: true
    })

    const clientMutation = useMutation({
        mutationFn: couponActions.createCoupons,
        onSuccess: ( data, _variables, context )=>{

            console.log('Se realizo el registro correctamente.')
            setClientRegistered(data)
        },
        onError: ( error:AxiosError<{ msg:string }> )=> {
            console.log('Hubo un error...')
            const { msg } = error.response!.data
            console.log(msg)
        }
    })

    return {
        clientMutation,
        clientRegistered
    }
}
