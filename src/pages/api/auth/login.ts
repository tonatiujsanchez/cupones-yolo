import type { NextApiRequest, NextApiResponse } from 'next'
import bcryptjs from 'bcryptjs'
import { db } from '@/database'
import { jwt } from '@/libs'
import { User } from '@/models'
import { IUserAuth } from '@/interfaces'

type Data = 
    | { msg: string }
    | {
        token: string
        user : IUserAuth
      }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
     
        case 'POST':
            return login( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const login = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { user='', password='' } = req.body

    if ([user, password].includes('')) {
        return res.status(400).json({ msg: 'El usuario y la contraseña son requeridos' })
    }

    try {
        await db.connect()
        const userByEmail = await User.findOne({ email:user })
        const userByName  = await User.findOne({ username:user })
        await db.disconnect()

        const userDB = userByEmail ? userByEmail : userByName

        if(!userDB){
            return res.status(400).json({ msg: 'Usuario o Contraseña no válidos' })
        }

        if( userDB && !userDB.status) {
            return res.status(400).json({ msg: 'Usuario o Contraseña no válidos' })
        }

        if( userDB && !userDB.active) {
            return res.status(400).json({ msg: 'Este usuario a sido bloqueado, por favor hable con un administrador' })
        }

        if( !userDB.confirmed ) {
            return res.status(400).json({ msg: 'Tu cuenta no a sido confirmada, revisa tu correo para confirmarla' })
        }

        if( !(bcryptjs.compareSync( password, userDB.password )) ){
            return res.status(400).json({ msg: 'Usuario o Contraseña no válidos' })
        }

        const token = jwt.signToken( userDB._id ) //jwt
        const { _id, name, username, email, photo, role } = userDB

        return res.status(200).json({
            token,
            user: {
                uid: _id,
                name,
                username,
                email,
                photo,
                role
            }
        })

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({ msg: 'Al salio mal, hable con el administrador' })
    }
}
