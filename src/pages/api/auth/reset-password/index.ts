import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt, sendEmail } from '@/libs'
import { db } from '@/database'
import { User } from '@/models'
import { isValidEmail } from '@/utils'

type Data = {
    msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {

        case 'POST':
            return sendEmailForResetPassword( req, res );
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const sendEmailForResetPassword = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { email='' } = req.body
    
    email = email.toLowerCase().trim()

    if( !email ){
        return res.status(404).json({ msg: 'El correo es requerido' })
    }

    // Validar email
    if( !isValidEmail(email) ){
        return res.status(400).json({ msg: 'El correo no es válido' })
    }

    try {
        // Buscar usuario por email
        await db.connect()
        const user = await User.findOne({ email })
        
        if( !user ){
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }

        if( user && !user.status) {
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }
    
        if( user && !user.active) {
            return res.status(400).json({ msg: 'Este usuario a sido bloqueado, por favor hable con un administrador' })
        }
        
        // Si la cuenta NO esta confirmada, reenviar el correo para confirmar su cuenta
        if( user && !user.confirmed) {

            user.token = jwt.signToken( user._id, '30d' )

            await user.save()
            await db.disconnect()
    
            // Enviar email 
            sendEmail.signIn({
                email: user.email, 
                name : user.name, 
                token: user.token
            })
            
            return res.status(400).json({ msg: 'Su cuenta no ha sido confirmada, por favor revisa tu correo y confirma tu cuenta' })
        }

        // Si la cuenta SI esta confirmada, enviar el correo para restablecer la contraseña
        user.token = jwt.signToken( user._id, '1d' )

        await user.save()
        await db.disconnect()

        // Enviar email 
        sendEmail.resetPassword({
            email: user.email, 
            name : user.name, 
            token: user.token
        })
        
        return res.status(200).json({ msg: user.email })

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({ msg: 'Error en el servidor, hable con el administrador' })
    }
}
