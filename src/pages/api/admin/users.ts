
import type { NextApiRequest, NextApiResponse } from 'next'

import bcryptjs from 'bcryptjs'

import { db } from '@/database'
import { User } from '@/models'
import { jwt } from '@/libs'
import { isValidEmail } from '../../../utils'


type Data = 
    | { msg: string }
    | {
        token: string
        user : {
            name    : string
            username: string
            email   : string
        }
      }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {

        case 'POST':
            return registerUser( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}


const registerUser = async( req:NextApiRequest, res:NextApiResponse<Data> ) => {

    let { name = '', username = '', email = '', password = '' } = req.body

    name     = name.trim()
    username = username.trim()
    email    = email.toLowerCase().trim()
    password = password.trim()


    if([ name, username, email, password ].includes('')){
        return res.status(400).json({
            msg: 'Las propiedades name, username, email y password son requeridas'
        })
    }

    if( name.length < 2 ){
        return res.status(400).json({ 
            msg: 'El nombre es muy corto, debe tener minimo 2 carateres' 
        })
    }

    if( password.length < 8 ) {
        return res.status(400).json({ 
            msg: 'La contraseña es muy corta, debe tener minimo 8 carateres' 
        })
    }

    if( !isValidEmail(email) ){
        return res.status(400).json({ 
            msg: 'El correo no es válido' 
        })
    }

    try {
        await db.connect()
        const [ userByEmail, userByUsername ] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username }),
        ])

        if( userByEmail ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una cuenta registrada con ese correo` })
        }

        if( userByUsername ){
            await db.disconnect()
            return res.status(400).json({ msg: `El username <${ username }> ya esta en uso` })
        }

        const newUser = new User({
            name,
            username,
            email,
            password: bcryptjs.hashSync( password )
        })

        await newUser.save({ validateBeforeSave: true })
        await db.disconnect()

        const token = jwt.signToken({ uid: newUser._id, role: newUser.role })

        return res.status(201).json({
            token,
            user: {
                name: newUser.name, 
                username: newUser.username, 
                email: newUser.email, 
            }
        })

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({ 
            msg: 'Al salio mal, hable con el administrador' 
        })        

    }
}