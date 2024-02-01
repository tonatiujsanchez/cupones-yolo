import { yolostyleApi } from "@/apis"


interface SignUpParams {
    name    : string
    email   : string
    password: string
}
export const signUp = async( { name, email, password }: SignUpParams ):Promise<{ msg: string }> => {
    
    const { data } = await yolostyleApi.post('/auth/sign-up', { name, email, password })
    return data
}


interface ConfirmAccountParams {
    token: string
}
export const confirmAccount = async({ token }:ConfirmAccountParams):Promise<{ msg: string }> => {

    const { data } = await yolostyleApi.post('/auth/confirm-account', { token })
    return data
}


interface ResetPasswordParams {
    email: string
}
export const resetPassword = async({ email }: ResetPasswordParams):Promise<{ msg:string }> =>{

    const { data } = await yolostyleApi.post('/auth/reset-password', { email })
    return data 
}


interface CheckPasswordTokenParams {
    token: string
}
export const checkPasswordToken = async({ token }:CheckPasswordTokenParams):Promise<{ msg: string }> => {

    const { data } = await yolostyleApi.post(`/auth/reset-password/${ token }`)
    return data
}


interface ChangePasswordParams {
    password: string
    token   : string
}
export const changePassword = async({ password, token }:ChangePasswordParams):Promise<{ msg: string }> => {
                                                
    const { data } = await yolostyleApi.put(`/auth/reset-password/${ token }`,{ password })
    return data
}
