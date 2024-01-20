import type { NextApiRequest, NextApiResponse } from 'next'
import { addDays } from 'date-fns'
import { db } from '@/database'
import { Client, Coupon, CouponSettingsPage, Route } from '@/models'
import { dateFormatLong } from '@/utils'
import { COUPONS_PAGE_SLUG } from '@/constants'
import { IClient } from '@/interfaces'


type Data = 
    | { msg: string }
    | IClient

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch (req.method) {
        case 'POST':
            return registerClient( req, res )        
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
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

    if( phone.toString().trim().length !== 10 ){
        return res.status(400).json({ msg: 'Número de celular no válido' })
    }

    if( !birthdate ){
        return res.status(400).json({ msg: 'Fecha de nacimiento requerida' })
    }

    try {
        await db.connect()
        const [couponSettingsPage, route, clients] = await Promise.all([
            CouponSettingsPage.findOne().sort({ createdAt: -1 }),
            Route.findOne({ slug: COUPONS_PAGE_SLUG }).select('-_id -status -__v'),
            Client.find({ phone })
        ])

        // Validaciones de que la ruta este activa
        if( !couponSettingsPage ){
            return res.status(401).json({ msg: 'Not authorized' })
        }
    
        if( !route ){
            return res.status(401).json({ msg: 'Not authorized' })
        }
    
        if( !route.active ){
            return res.status(401).json({ msg: 'Lo sentimos, no hay cupones disponibles por el momento' })
        }

        // Validación que la petición de registro este dentro del rango de fechas permitidas
        const today = new Date()
        const dateStart = new Date(couponSettingsPage.dateToRegisterStart) 
        const dateEnd = addDays( couponSettingsPage.dateToRegisterEnd, 1 )

        if( today < dateStart ){
            return res.status(400).json({ msg: `El registro estará disponible a partir del día ${ dateFormatLong(couponSettingsPage.dateToRegisterStart) }`})
        }

        if( today > dateEnd ){
            return res.status(400).json({ msg: 'La fecha limite para registrarse a terminado' })
        }

        // Validación que el mes actual coincida con el mes de cumpleaños del usuario
        const currentMonth = new Date().getMonth()
        const birthdateMonth = new Date(birthdate).getMonth()
        
        if( currentMonth !== birthdateMonth ){
            return res.status(400).json({ msg: `Lo sentimos, pero en este momento solo estamos aceptando registros de usuarios que cumplan años en el mes de enero. Apreciamos tu interés y te invitamos a intentarlo nuevamente en tu mes de cumpleaños. ¡Gracias!`})
        }

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
            congratulationTitle: couponSettingsPage.congratulationTitle,
            congratulationSubtitle : couponSettingsPage.congratulationSubtitle,
            conditions: couponSettingsPage.conditions,
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
        const expiredAt = new Date(couponSettingsPage.couponValidityEnd) 

        const newCoupons = couponSettingsPage.coupons.map(({ title, value }) => {
            const folio = (Math.random().toString(36).substring(2) + Date.now().toString(36)).slice(0, 13).toUpperCase()
            return new Coupon({
                client: newClient._id,
                title,
                value,
                issuedAt: new Date(),
                expiredAt: expiredAt,
                folio,
                code: `YOLO-${ value }`
            })
        })

        newClient.coupons = newCoupons

        // Guardar cupones en la DB
        for await( const newCoupon of newCoupons ) {
            await newCoupon.save()
        }
        await newClient.save()

        await db.disconnect()

        return res.status(200).json( newClient )

    } catch (error) {
        await db.disconnect()
        console.log( error )
        return res.status(500).json({ msg: 'Algo salio mal, hable con el administrador' }) 
    }
}