import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { CouponSettingsPage, Route } from '@/models'
import { COUPONS_PAGE_SLUG } from '@/constants'
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
        const [couponSettingsPage, route] = await Promise.all([
            CouponSettingsPage.findOne().sort({ createdAt: -1 }),
            Route.findOne({ slug: COUPONS_PAGE_SLUG }).select('-_id -status -__v')
        ])

        await db.disconnect()
    
        if( !couponSettingsPage ){
            return res.status(400).json({ msg: 'No hay configuraciones establecidas' })
        }

        if( !route ){
            return res.status(400).json({ msg: 'Ruta no encontrada' })
        }


        if( !route.active ){
        // Si la ruta no esta active===false, solo es un usuario ADMIN tendrá acceso a esta DATA 
        // return res.status(401).json({ msg: 'Not authorized' })
        }

        return res.status(200).json({
            ...JSON.parse( JSON.stringify(couponSettingsPage) ) ,
            route
        })

    } catch (error) {
        await db.disconnect()
        console.log( error )
        return res.status(500).json({ msg: 'Algo salio mal, hable con el administrador' }) 
    }

}
