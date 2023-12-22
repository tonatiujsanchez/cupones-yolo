import type { NextApiRequest, NextApiResponse } from 'next'

import { FilterQuery, isValidObjectId } from 'mongoose'

import { db } from '@/database'
import { Client, Coupon } from '@/models'
import { COUPONS_PAGE_SIZE, COUPON_EXCHANGE_OPTIONS } from '@/constants'

import { ICoupon, ICouponsResp } from '@/interfaces'


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

    const { page = 1, count = pageSize, searchTerm = '', exchangeStatus = '' } = req.query

    let skip = Number( page ) - 1
    let limit = Number(count)

    if( skip < 0 ) { skip = 0 }
    if( limit < 0 ) { limit = pageSize }

    skip = skip * limit

    let query:FilterQuery<ICoupon> = { 
        status: true
    }

    const queriesFilterOr = []

    if( searchTerm.toString().trim() !== '' ) {
        queriesFilterOr.push({ folio: { $regex: new RegExp(searchTerm.toString(), "i") } })
        queriesFilterOr.push({
            client: {
                $in: await Client.find({
                    name: { $regex: new RegExp(searchTerm.toString(), 'i') },
                }).distinct('_id'),
            },
        },)
    }

    if( COUPON_EXCHANGE_OPTIONS.includes( exchangeStatus.toString() ) ) {

        if(exchangeStatus === COUPON_EXCHANGE_OPTIONS[0]){ // canjeados
            query = {
                ...query,
                exchangedAt: { $exists: true, $ne: null },
                expiredAt: { $gte: new Date() }
            }
        }

        if(exchangeStatus === COUPON_EXCHANGE_OPTIONS[1]){ // sin_canjear
            query = {
                ...query,
                exchangedAt: null,
                expiredAt: { $gte: new Date() }
            }
        }
        
        if(exchangeStatus === COUPON_EXCHANGE_OPTIONS[2]){ // expirados
            query = {
                ...query,
                exchangedAt: null,
                expiredAt: { $lt: new Date() }
            }
        }
    }

    if( queriesFilterOr.length > 0 ){
        query = {
            ...query,
            $and: [
                {
                    $or: queriesFilterOr
                }
            ]
        }
    }


    try {
        await db.connect()
        const [ coupons, total ] = await Promise.all([
            Coupon.find(query)
                .populate('client', 'name registeredAt')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: 'desc' }),
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