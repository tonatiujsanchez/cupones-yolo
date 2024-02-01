import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { jwt } from '@/libs'
import { User } from '@/models'

type Data = {
    msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {

        case 'POST':
            return checkToken( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const checkToken = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token } = req.query as { token: string }

    if( !token ){
        return res.status(400).json({ msg: 'El Token es requerido' })
    }

    // Validar token(jwt)
    let uid
    try {
        uid = await jwt.isValidToken( token )
    } catch (error) {
        return res.status(400).json({ msg: 'Token no válido' })
    }

    try {
        // Verificar que el usuario exista 
        await db.connect()
        const user = await User.findById( uid )
        await db.disconnect()

        if( !user ){
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }

        if( user && !user.status) {
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }

        if( user && !user.active) {
            return res.status(400).json({ msg: 'Este usuario a sido bloqueado, por favor hable con un administrador' })
        }

        // Verificar que la cuenta del usuario este confirmada 
        if( user && !user.confirmed) {
            return res.status(400).json({ msg: 'Su cuenta no ha sido confirmada, por favor revisa tu correo y confirma tu cuenta' })
        }

        if( !user.token ) {
            return res.status(400).json({ msg: 'Token no válido' })
        }
        
        return res.status(200).json({ msg: user.name })

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, hable con el administrador' })
    }
}
