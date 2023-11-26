import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { couponActions } from '@/services'

import { canvasConfetti } from '@/libs'
import { IClient } from '@/interfaces'


export const useRegisterClient = () => {

    const [ clientRegistered, setClientRegistered ] = useState<IClient>(/* {
        name: 'Tonatiuj Sánchez',
        phone: 7571250112,
        email: null,
        birthdate : new Date('1938-05-07T00:00:00.000Z'),
        receivePromotions: true,
        registeredAt:new Date('2023-11-22T18:05:38.433Z'), 
        coupons: [],
        couponsSent: false,
        status: true
    } */)

    const clientMutation = useMutation({
        mutationFn: couponActions.createCoupons,
        onSuccess: ( data )=>{
            setClientRegistered(data)
            canvasConfetti()
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
