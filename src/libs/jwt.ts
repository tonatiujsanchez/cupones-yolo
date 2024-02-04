import jwt from 'jsonwebtoken'
import { USER_ROLES } from '@/constants'
import { IUserRol } from '@/interfaces'


interface SignTokenParams {
    uid       : string
    expiresIn?: string
    role?     : IUserRol
} 
export const signToken = ({ uid, expiresIn='30d', role=USER_ROLES.client as IUserRol }:SignTokenParams ) => {

    if( !process.env.JWT_SECRET_SEED ){
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    return jwt.sign(
        { uid, role },
        process.env.JWT_SECRET_SEED,
        { expiresIn }
    )
}


export const isValidToken = (token: string):Promise<string> => {

    if( token.trim().length <= 10 ){
        return Promise.reject('JWT no válido')
    }

    return new Promise(( resolve, reject )=>{
        
        if( !process.env.JWT_SECRET_SEED ){
            return reject("No hay semilla de JWT - Revisar variables de entorno");
        }
        
        try {
        
            jwt.verify(token, process.env.JWT_SECRET_SEED, ( err, payload )=>{
                if( err ){
                    return reject('El token no es valido')
                }

                const { uid } = payload as { uid: string }
                resolve( uid )
            })
            
        } catch (error) {
            reject('El token no es valido')
        }
    })

}