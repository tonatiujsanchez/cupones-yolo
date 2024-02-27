import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery, isValidObjectId } from 'mongoose'
import { db } from '@/database'
import { getSlug } from '@/libs'
import { Size } from '@/models'
import { SIZES_PAGE_SIZE } from '@/constants'
import { ISize, ISizesResp } from '@/interfaces'

type Data = 
    | { msg: string }
    | ISize
    | ISizesResp

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {

        case 'GET':
            return getSizes( req, res )

        case 'POST':
            return addNewSize( req, res )
    
        case 'PUT':
            return updateSize( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }

}

const addNewSize = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { label='', active=true } = req.body

    label = label.trim()

    if( label === '' ){
        return res.status(400).json({ msg: 'La talla es requerida' })
    }

    const value = getSlug( label )

    try {
        await db.connect()
        const size = await Size.findOne({ value })
        
        if( size ){
            return res.status(400).json({ msg: `Ya existe una talla llamada ${ size.label }` })
        }

        const newSize = new Size({
            label,
            value,
            active
        })

        await newSize.save()
        await db.disconnect()

        delete newSize.createdAt
        delete newSize.updatedAt
        delete newSize.status

        return res.status(200).json( newSize )
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}


const pageSize = SIZES_PAGE_SIZE;
const getSizes = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { page = 1, count = pageSize } = req.query

    let skip = Number( page ) - 1
    let limit = Number(count)

    if( skip < 0 ){ skip = 0 }
    if( limit < 0 ){ limit = pageSize }

    skip = skip * limit


    let query:FilterQuery<ISize> = { 
        status: true
    }

    try {

        await db.connect()
        const [ sizes, total ] = await Promise.all([
            Size.find( query )
                .skip(skip)
                .limit(limit)
                .sort({ registeredAt: 'desc'})
                .select('-status -createdAt -updatedAt'),
            Size.countDocuments(query)
        ])
        await db.disconnect()


        return res.status(200).json({
            currentPage: Number(page),
            totalPages : Math.ceil( total / Number(count) ),
            pageSize   : sizes.length,
            totalSizes : total,
            sizes
        })
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}


const updateSize = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id } = req.body

    if( !isValidObjectId( _id ) ){
        return res.status(400).json({ msg: 'ID de la talla no válido' })
    }

    try {
        await db.connect()

        const size = await Size.findById(_id)
            .where('status').equals(true)
            .select('-status -createdAt -updatedAt')

        if( !size ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Talla no encontrada' })
        }

        let {
            label= size.label,
            active= size.active
        } = req.body

        label = label.trim()
        const value = getSlug( label )

        let sizeByLabel
        if( size.label !== label ){
            sizeByLabel = await Size.findOne({ value, _id: { $ne: _id } })
                .select('-status -createdAt -updatedAt')
        }

        if( sizeByLabel && sizeByLabel.status ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una talla ${ sizeByLabel.label }` })
        }

        if( sizeByLabel && !sizeByLabel.status ){

            sizeByLabel.status = true
            await sizeByLabel.save() 
            await db.disconnect()

            return res.status(200).json( sizeByLabel )
        }

        size.value = value
        size.label = label 
        size.active = active

        await size.save()
        await db.disconnect()

        return res.status(200).json( size )
        
    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}