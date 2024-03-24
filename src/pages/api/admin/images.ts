import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery } from 'mongoose'
import { db } from '@/database'
import { Image } from '@/models'
import { ALL_SECTIONS_OF_IMAGES, IMAGES_SECTIONS_OPTIONS, IMAGE_PAGE_SIZE } from '@/constants'
import { IImage, IImagesResp } from '@/interfaces'


type Data = 
    | { msg: string }
    | IImagesResp

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':    
            return getImages( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const pageSize = IMAGE_PAGE_SIZE;

const getImages = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { section = ALL_SECTIONS_OF_IMAGES, page = 1, count = pageSize } = req.query

    let skip = Number( page ) - 1
    let limit = Number( count )

    if( skip < 0 ){ skip = 0 }
    if( limit < 0 ){ limit = pageSize }

    skip = skip * limit

    let query:FilterQuery<IImage> = {}

    if( section !== ALL_SECTIONS_OF_IMAGES && IMAGES_SECTIONS_OPTIONS.includes( section.toString() ) ){
        query = {
            ...query,
            section
        }
    }

    try {
        await db.connect()
        const [ images, total ] = await Promise.all([
            Image.find( query )
                .skip(skip)
                .limit(limit)
                .select('-__v,')
                .sort({ createdAt: 'desc'}),
            Image.find(query).count()
        ])
        await db.disconnect()

        return res.status(200).json({
            currentPage: Number(page),
            totalPages : Math.ceil( total / Number(count) ),
            pageSize   : images.length,
            totalImages: total,
            images,
        })
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }
}

