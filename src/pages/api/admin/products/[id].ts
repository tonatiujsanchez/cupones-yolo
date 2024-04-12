import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { Product } from '@/models'
import { db } from '@/database'
import { IProduct } from '@/interfaces'

type Data = 
    | { msg: string }
    | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        
        case 'GET':
            return getProduct( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const getProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { id = '' } = req.query

    if( !isValidObjectId( id ) ){
        return res.status(400).json({ msg: 'Producto no encontrado' })
    }

    try {
        await db.connect()
        const product = await Product.findById(id)
            .populate('images')
            .populate('category')
            .populate('sections')
            .populate('sizes')
            .where('status', true)
        await db.disconnect()
        
        if( !product ){
            return res.status(400).json({ msg: 'Producto no encontrado' })
        }

        return res.status(200).json(product)
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Algo salio mal, revisar la consola del servidor' })
    }
}
