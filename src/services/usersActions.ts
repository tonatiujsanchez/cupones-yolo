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