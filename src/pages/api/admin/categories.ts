import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
    
        case 'POST':
            return addNewCategory( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const addNewCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { title='', slug='', cover='', active=null  } = req.body
    title = title.trim()
    slug = slug.trim()

    if( title === '' ){
        return res.status(400).json({ msg: 'El titulo de la categoría es requerido' })
    }

    if( slug === '' ){
        return res.status(400).json({ msg: 'El slug de la categoría es requerido' })
    }

    try {



        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }    
}
