import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { IRoute } from '@/interfaces'
import { Route } from '@/models'

type Data = 
    | { msg: string }
    | IRoute[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        
        case 'GET':
            return getRoutes( res, res )
                
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }
}

const getRoutes = async(req: NextApiResponse<Data>, res: NextApiResponse<Data>) => {
    
    try {
        await db.connect()
        const routes = await Route.find({ status: true, active: true }).select('title slug -_id')
        await db.disconnect()
        
        return res.status(200).json( routes )
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}
