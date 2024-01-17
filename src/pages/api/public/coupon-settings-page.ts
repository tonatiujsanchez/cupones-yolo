import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { CouponSettingsPage } from '@/models'

import { ICouponSettingsPage } from '@/interfaces'

type Data = 
    | { msg: string }
    | ICouponSettingsPage

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getCouponSettingsPage( req, res )

        default:
            return res.status(400).json({
                msg: 'Bad request'
            })
    }
}

const getCouponSettingsPage = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        await db.connect()
        const couponSettingsPage = await CouponSettingsPage.findOne().sort({ createdAt: -1 })
        await db.disconnect()
    
        if( !couponSettingsPage ){
            return res.status(400).json({ msg: 'No hay cupones activos' })
        }

        return res.status(200).json( couponSettingsPage )

    } catch (error) {
        await db.disconnect()
        console.log( error )
        return res.status(500).json({ msg: 'Algo salio mal, hable con el administrador' }) 
    }

}
