import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { Client, Coupon } from '@/models'

import { IClient } from '@/interfaces'



type Data = 
    | { msg: string }
    | IClient

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch (req.method) {
        case 'POST':
            return registerClient( req, res )        
    
        default:
            return res.status(400).json({
                msg: 'Bad request'
            })
    }
}


const registerClient = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { name = '', phone = null, birthdate = null, email = null, receivePromotions = false } = req.body

    if( name.trim() === '' ){
        return res.status(400).json({ msg: 'El nombre es requerido' })
    }

    if( !phone ){
        return res.status(400).json({ msg: 'El número de celular es requerido' })
    }

    if( phone.toString().trim().lenght !== 10 ){
        return res.status(400).json({ msg: 'Número de celular no válido' })
    }

    if( !birthdate ){
        return res.status(400).json({ msg: 'Fecha de nacimiento requerida' })
    }

    try {
        
        await db.connect()
        const clients = await Client.find({ phone })

        // Buscar si el cliente ya se registro en el año actual
        const client = clients.find(( clientDB ) => {
            const currentYear = new Date().getFullYear()  //Obtener el año actual
            const clientRegisterYear = new Date( clientDB?.createdAt! ).getFullYear() // Obtener el años de registro del cliente 
        
            if( currentYear === clientRegisterYear ){
                return clientDB
            }
            return null    
        })

        if( client ){
            return res.status(400).json({ msg: `El número ${ phone } ya esta registrado` })
        }


        // Crear nuevo cliente
        const newClient = new Client({
            name: name.trim(),
            phone,
            birthdate,
            email,
            receivePromotions,
            registeredAt: new Date(),
            coupons: []
        })

        if( email.trim() === '' ){
            newClient.email = null
        }

        // Crear cupones
        const expiredAt = new Date(2023, 10, 30) //TODO: Este debe venir de la DB

        const coupon10 = new Coupon({
            client: newClient._id,
            value: 10,
            issuedAt: new Date(),
            expiredAt: expiredAt,
            folio: String( Date.now() )
        })
        
        const coupon15 = new Coupon({
            client: newClient._id,
            value: 15,
            issuedAt: new Date(),
            expiredAt: expiredAt,
            folio: String( Date.now() + 1 )
        })

        newClient.coupons = [ coupon10._id, coupon15._id ]

        await Promise.all([
            coupon10.save(),
            coupon15.save(),
            newClient.save(),
        ])

        await db.disconnect()

        return res.status(200).json( newClient )

    } catch (error) {
        await db.disconnect()
        console.log( error )
        return res.status(500).json({ msg: 'Algo salio mal, hable con el administrador' }) 
    }
}