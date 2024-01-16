import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { CouponSettingsPage } from '@/models'
import { ICouponSettingsPage } from '@/interfaces'
import { ICouponLite } from '../../../interfaces/ICoupon';

type Data = 
    | { msg: string }
    | ICouponSettingsPage

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
 
    switch (req.method) {
        case 'PUT':
            return updateCouponSettingsPage( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }
}

const updateCouponSettingsPage = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        await db.connect()

        // TODO: Verificar que la ruta este activa

        const couponSettingsPage = await CouponSettingsPage.findOne().sort({ createdAt: -1 })

        if( !couponSettingsPage ){
            return res.status(400).json({ msg: 'No hay cupones activos' })
        }

        const { 
            pageTitle = couponSettingsPage.pageTitle,
            pageSubtitle = couponSettingsPage.pageSubtitle,
            dateToRegisterStart = couponSettingsPage.dateToRegisterStart,
            dateToRegisterEnd = couponSettingsPage.dateToRegisterEnd,
            coupons = couponSettingsPage.coupons,
            congratulationTitle = couponSettingsPage.congratulationTitle,
            congratulationSubtitle = couponSettingsPage.congratulationSubtitle,
            conditions = couponSettingsPage.conditions,
            couponValidityStart = couponSettingsPage.couponValidityStart,
            couponValidityEnd = couponSettingsPage.couponValidityEnd
        } = req.body

        coupons.forEach(( coupon:ICouponLite ) => {
            delete coupon._id
        })

        couponSettingsPage.pageTitle = pageTitle,
        couponSettingsPage.pageSubtitle = pageSubtitle,
        couponSettingsPage.dateToRegisterStart = dateToRegisterStart,
        couponSettingsPage.dateToRegisterEnd = dateToRegisterEnd,
        couponSettingsPage.coupons = coupons,
        couponSettingsPage.congratulationTitle = congratulationTitle,
        couponSettingsPage.congratulationSubtitle = congratulationSubtitle,
        couponSettingsPage.conditions = conditions,
        couponSettingsPage.couponValidityStart = couponValidityStart,
        couponSettingsPage.couponValidityEnd = couponValidityEnd,

        await couponSettingsPage.save()
        await db.disconnect()
        
        return res.status(200).json( couponSettingsPage )
        
    } catch (error) {
        await db.disconnect()
        console.log( error )
        return res.status(500).json({ msg: 'Algo salio mal, hable con el administrador' }) 
    }
}
