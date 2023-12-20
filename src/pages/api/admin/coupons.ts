import type { NextApiRequest, NextApiResponse } from 'next'

import { isValidObjectId } from 'mongoose'
import { db } from '@/database'
import { Coupon } from '@/models'
import { ICoupon, ICouponsResp } from '@/interfaces'
import { COUPONS_PAGE_SIZE } from '@/constants'


type Data = 
    | { msg: string }
    | ICouponsResp
    | ICoupon

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        
        case 'GET':
            return getCoupons( req, res )
        
        case 'PUT':
            return updateCoupon( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const pageSize = COUPONS_PAGE_SIZE;
const getCoupons = async( req: NextApiRequest, res:NextApiResponse<Data> ) => {

    const { page = 1, count = pageSize, } = req.query

    let skip = Number( page ) - 1
    let limit = Number(count)

    if( skip < 0 ) { skip = 0 }
    if( limit < 0 ) { limit = pageSize }

    skip = skip * limit

    const query = {}

    try {

        await db.connect()
        const [ coupons, total ] = await Promise.all([
            Coupon.find(query)
                .populate('client', 'name registeredAt')
                .skip(skip)
                .limit(limit)
                .sort({ issuedAt: 'desc' }),
            Coupon.countDocuments(query)
        ])
        await db.disconnect()
        
        return res.status(200).json({
            currentPage : Number(page),
            totalPages  : Math.ceil( total / Number(count) ),
            pageSize    : coupons.length,
            totalCoupons: total,
            coupons
        })

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}


const updateCoupon = async( req: NextApiRequest, res:NextApiResponse<Data> ) => {

    const { _id } = req.body

    if( !isValidObjectId( _id ) ){
        return res.status(400).json({ msg: 'ID de cupón no válido' })
    }

    try {
        await db.connect()
        const couponDB = await Coupon.findById(_id)
            .populate('client', 'name registeredAt')
        
        if( !couponDB ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Cupón no encontrado' })
        }

        const {
            value      = couponDB.value,
            expiredAt  = couponDB.expiredAt,
            exchangedAt= couponDB.exchangedAt,
        } = req.body


        couponDB.value     = value
        couponDB.expiredAt = expiredAt
        couponDB.exchangedAt = exchangedAt

        await couponDB.save()

        await db.disconnect()

        return res.status(200).json(couponDB)

    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })

    }

}