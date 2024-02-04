import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { yolostyleApi } from '@/apis'
import { COOKIE_AUTH_KEY } from '@/constants'
import { IUserAuth } from '@/interfaces'


interface Props {
    login: (token: string, user: IUserAuth) => void
    logout: () => void
}
export const useCheckAuth = ({ login, logout }:Props) => {

    useEffect(()=>{
        checkToken()
    },[])

    const checkToken = async () => {

        if( !Cookies.get(COOKIE_AUTH_KEY) ){ return }

        try {
            const { data } = await yolostyleApi.get('/auth/validate-session')
            const { token, user } = data
            
            Cookies.set(COOKIE_AUTH_KEY, token)            
            login( token, user )
        
        } catch (error) {
            logout()
        }
    }

}
