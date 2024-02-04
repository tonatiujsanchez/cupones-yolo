import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt } from '@/libs'
import { db } from '@/database'
import { COOKIE_AUTH_KEY } from '@/constants'
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

        case 'GET':
            return checkAuth( req, res )
            
        default:
            return res.status(400).json({ msg: 'Bad request' })
            
    }

}

const checkAuth = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const token = req.cookies[COOKIE_AUTH_KEY]

    if(!token){
        return res.status(400).json({ msg: 'Not authorized' })
    }
    
    let uid = ''
    try {
        uid = await jwt.isValidToken( token )
    } catch (error) {
        return res.status(401).json({ msg: 'Not authorized' })
    }


    try {

        await db.connect()
        const user = await User.findById(uid).lean()
        await db.disconnect()

        if(!user){
            return res.status(400).json({ msg: 'Not authorized' })
        }

        if( user && !user.status) {
            return res.status(400).json({ msg: 'Not authorized' })
        }

        if( user && !user.active) {
            return res.status(400).json({ msg: 'Not authorized' })
        }

        if( !user.confirmed ) {
            return res.status(400).json({ msg: 'Not authorized' })
        }

        const { _id, name, username, email, photo, role } = user
        
        const token = jwt.signToken({ uid:user._id, role }) //jwt

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
