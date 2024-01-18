import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { db } from '@/database'
import { Route } from '@/models'
import { IRoute } from '@/interfaces'


type Data = 
    | { msg : string }
    | IRoute

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {

        case 'PUT':
            return updateRoute( req, res )
            
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }
} 

const updateRoute = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { _id } = req.body

    if( !isValidObjectId( _id ) ){
        return res.status(400).json({ msg: 'ID de Ruta no válido' })
    }

    try {

        await db.connect()
        const route = await Route.findById(_id)

        if (!route) {
            await db.disconnect()
            return res.status(400).json({ msg: 'Ruta no encontrada' })
        }

        if( !route.status ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Ruta no encontrada' })
        }

        const {
            title  = route.title,
            slug   = route.slug,
            active = route.active,
        } = req.body

        route.title  = title
        route.slug   = slug
        route.active = active

        await route.save()
        await db.disconnect()

        return res.status(200).json( route )
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }
}
