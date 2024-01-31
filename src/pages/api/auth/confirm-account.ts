import { db } from '@/database'
import { jwt } from '@/libs'
import { User } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'POST':
            return confirmAccount( req, res )    
        
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const confirmAccount = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token } = req.body

    if(!token) {
        return res.status(400).json({ msg: 'Token requerido' })
    }

    // Validar token(jwt)
    let uid
    try {
        uid = await jwt.isValidToken( token )
    } catch (error) {
        return res.status(400).json({ msg: 'Token de confirmación no válido' })
    }
    
    try {
        // Verificar que el usuario exista 
        await db.connect()
        const user = await User.findById( uid )

        if( !user ) {
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }

        if( user && !user.status) {
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }

        if( user && !user.active) {
            return res.status(400).json({ msg: 'Este usuario a sido bloqueado, por favor hable con un administrador' })
        }

        if( user.confirmed ) {
            return res.status(400).json({ msg: 'Token no válido' })
        }

        if( !user.token ) {
            return res.status(400).json({ msg: 'Token no válido' })
        }

        // Confirmar cuenta y eliminar token
        user.confirmed = true
        user.token = null

        await user.save()
        await db.disconnect()

        return res.status(200).json({ msg: 'Cuenta confirmada' })

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, hable con el administrador' })
    }



}
