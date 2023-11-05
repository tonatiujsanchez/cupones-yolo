
import jwt from 'jsonwebtoken'


export const signToken = ( uid: string, email:string ) => {

    if( !process.env.JWT_SECRET_SEED ){
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    return jwt.sign(
        { uid, email },
        process.env.JWT_SECRET_SEED,
        { expiresIn: '30d' }
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