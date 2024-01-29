import type { NextApiRequest, NextApiResponse } from 'next'
import bcryptjs from 'bcryptjs'
import { jwt, sendEmail } from '@/libs'
import { db } from '@/database'
import { User } from '@/models'
import { isValidEmail } from '@/utils'
import { IUserAuth } from '@/interfaces'

type Data = 
    | { msg: string }
    | IUserAuth

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        
        case 'POST':
            return signUp( req, res )    
            
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const signUp = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { name='', email='', password='' } = req.body
    
    name     = name.trim()
    email    = email.toLowerCase().trim()
    password = password.trim()

    if( !name ){
        return res.status(404).json({ msg: 'El nombre es requerido' })
    }

    if( !email ){
        return res.status(404).json({ msg: 'El correo es requerido' })
    }

    if( !password ){
        return res.status(404).json({ msg: 'La contraseña es requerida' })
    }

    if( name.length < 2 ){
        return res.status(400).json({ msg: 'El nombre es muy corto, debe tener mínimo 2 caracteres' })
    }

    if( !isValidEmail(email) ){
        return res.status(400).json({ msg: 'El correo no es válido' })
    }

    if( password.length < 6 ) {
        return res.status(400).json({ msg: 'La contraseña es muy corta, debe tener mínimo 6 caracteres' })
    }

    try {

        await db.connect()

        const user = await User.findOne({ email: email.trim() })

        if( user && !user.status ){
            // En caso de que el usuario fue eliminado, volver a activar al usuario
            user.status = true
            user.token = jwt.signToken( user._id )

            await user.save()
            await db.disconnect()

            sendEmail.signIn({
                email: user.email, 
                name : user.name, 
                token: user.token
            })

            return res.status(200).json({
                uid      : user._id,
                name     : user.name,
                username : user.username,
                email    : user.email,
                role     : user.role,
            })  
        }

        // En caso de que el usuario fue bloqueado, no hacer el registro
        if( user && !user.active ){
            await db.disconnect()
            return res.status(400).json({ msg: 'No puede registrarse, este usuario a sido bloqueado, por favor hable con un administrador' }) }


        if( user ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una cuenta registrada con ese correo` })
        }

        
        const username = email.split('@')[0]
        const newUser = new User({
            name,
            username,
            email,
            password: bcryptjs.hashSync( password ),
        })
        newUser.token = jwt.signToken( newUser._id )

        await newUser.save()
        await db.disconnect()
        
        // Enviar email para confirma la cuenta
        sendEmail.signIn({
            email: newUser.email, 
            name: newUser.name, 
            token: newUser.token
        })

        return res.status(200).json({msg: '¡Gracias por registrarte en Yolostyle! 🌟 Revisa tu correo para confirmar tu cuenta y comienza a disfrutar de la mejor experiencia de compra. 🎉 ¡Bienvenido a Yolostyle! '})        
        
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({ msg: 'Al salio mal, hable con el administrador' })
    }

}

// TODO: Endpoint de registro de usuario y envio de email de confirmación de cuenta, implementado