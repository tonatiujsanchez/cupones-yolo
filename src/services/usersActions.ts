import { yolostyleApi } from "@/apis"
import { IUserAuth, IUsersResp } from "@/interfaces"


interface LoginParams {
    user    : string
    password: string
}
export const login = async( { user, password }: LoginParams ):Promise<{ token: string, user : IUserAuth }> => {
    
    const { data } = await yolostyleApi.post('/auth/login', { user, password })
    return data
}


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


interface CheckTokenParams {
    token   : string
}
export const checkToken = async({ token }:CheckTokenParams):Promise<{ msg: string }> => {
                                                
    const { data } = await yolostyleApi.get(`/auth/validate-session/${token}`)
    return data
}

interface GetUsersParams {
    page : number
    count: number
}
export const getUsers = async ({ page, count }:GetUsersParams):Promise<IUsersResp> => {

    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('count', count.toString())
    
    const { data } = await yolostyleApi.get('/super-admin/users', { params })
    return data
}