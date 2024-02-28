import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery, isValidObjectId } from 'mongoose'
import { db } from '@/database'
import { Client } from '@/models'
import { CLIENTS_PAGE_SIZE, COUPONS_SENT_OPTIONS } from '@/constants'

import { IClient, IClientsResp } from '@/interfaces'



type Data = 
    | { msg: string }
    | IClientsResp
    | IClient

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {

        case 'GET':
            return getClients( req, res )
        
        case 'PUT':
            return updateClient( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}   


const pageSize = CLIENTS_PAGE_SIZE;
const getClients = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { page = 1, count = pageSize, searchTerm = '', couponsSent = '', month='', year='' } = req.query

    let skip = Number( page ) - 1
    let limit = Number(count)

    if( skip < 0 ){ skip = 0 }
    if( limit < 0 ){ limit = pageSize }

    skip = skip * limit


    let query:FilterQuery<IClient> = { 
        status: true
    }
    const queriesFilterOr = []
    
    if( searchTerm.toString().trim() !== '' ) {
        queriesFilterOr.push({ name: { $regex: new RegExp(searchTerm.toString(), "i") } })
    }

    if(  COUPONS_SENT_OPTIONS.includes(couponsSent.toString()) ){
        query = {
            ...query,
            couponsSent: couponsSent === 'enviados'
        }
    }

    if( year !== '' ){
        const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`)
        const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`)
        query = {
            ...query,
            registeredAt: {
                $gte: startOfYear,
                $lt: endOfYear,
            }
        }
    }

    if( month !== '' ){
        const targetMonth = parseInt(month.toString(), 10);
        query = {
            ...query,
            $expr: {
                $eq: [{ $month: '$birthdate' }, targetMonth],
            },
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
        const [ clients, total ] = await Promise.all([
            Client.find( query )
                .populate('coupons', 'value issuedAt expiredAt exchangedAt folio')
                .skip(skip)
                .limit(limit)
                .sort({ registeredAt: 'desc'}),
            Client.countDocuments(query)
        ])
        await db.disconnect()

        return res.status(200).json({
            currentPage  : Number(page),
            totalPages   : Math.ceil( total / Number(count) ),
            pageSize     : clients.length,
            totalClientes: total,
            clients,
        })
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }    

}

const updateClient = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { _id } = req.body

    if( !isValidObjectId( _id ) ){
        return res.status(400).json({ msg: 'ID de registro no válido' })
    }

    try {
        await db.connect()
        const clientDB = await Client.findById(_id)
            .populate('coupons', 'value issuedAt expiredAt exchangedAt folio')
        

        if(!clientDB){
            await db.disconnect()
            return res.status(400).json({ msg: 'Registro no encontrado' })
        }

        const {
            name        = clientDB.name,
            phone       = clientDB.phone,
            birthdate   = clientDB.birthdate,
            email       = clientDB.email,
            couponsSent = clientDB.couponsSent
        } = req.body

        clientDB.name        = name
        clientDB.phone       = phone
        clientDB.birthdate   = birthdate
        clientDB.email       = email
        clientDB.couponsSent = couponsSent

        await clientDB.save()

        await db.disconnect()
        
        return res.status(200).json( clientDB )

    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }
}