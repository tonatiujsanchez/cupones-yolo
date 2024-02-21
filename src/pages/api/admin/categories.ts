import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery } from 'mongoose'
import { db } from '@/database'
import { isValidSlug } from '@/libs'
import { Category } from '@/models'
import { CATEGORIES_PAGE_SIZE } from '@/constants'

import { ICategoriesResp, ICategory } from '@/interfaces'

type Data = 
    | { msg: string }
    | ICategoriesResp
    | ICategory

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
    
        case 'GET':
            return getCategories( req, res )
    
        case 'POST':
            return addNewCategory( req, res )
            
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const addNewCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { title='', slug='', cover, pinned=true,  active=true  } = req.body
    title = title.trim()
    slug = slug.trim()
    console.log(req.body.title)

    if( title === '' ){
        return res.status(400).json({ msg: 'El titulo de la categoría es requerido' })
    }

    if( slug === '' ){
        return res.status(400).json({ msg: 'El slug de la categoría es requerido' })
    }

    if(!isValidSlug( slug )) {
        return res.status(400).json({ msg: 'El slug no es válido' })
    }

    try {

        await db.disconnect()
        const [ categoryByTitle, categoryBySlug ] = await Promise.all([
            Category.findOne({ title }),
            Category.findOne({ slug })
        ])

        if( categoryByTitle ){
            return res.status(400).json({ msg: `Ya existe una categoría llamada "${ categoryByTitle.title }"` })
        }

        if( categoryBySlug ){
            return res.status(400).json({ msg: `Ya existe una categoría con el slug "${ categoryBySlug.slug }"` })
        }

        const newCategory = new Category({
            title,
            slug,
            cover,
            pinned,
            active
        })

        await newCategory.save()
        await db.disconnect()
        
        return res.status(200).json(newCategory)
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }    
}



const pageSize = CATEGORIES_PAGE_SIZE;
const getCategories = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { page = 1, count = pageSize } = req.query

    let skip = Number( page ) - 1
    let limit = Number(count)

    if( skip < 0 ){ skip = 0 }
    if( limit < 0 ){ limit = pageSize }

    skip = skip * limit


    let query:FilterQuery<ICategory> = { 
        status: true
    }

    try {
        await db.connect()
        const [ categories, total ] = await Promise.all([
            Category.find( query )
                .skip(skip)
                .limit(limit)
                .sort({ registeredAt: 'desc'}),
                Category.countDocuments(query)
        ])
        await db.disconnect()

        return res.status(200).json({
            currentPage    : Number(page),
            totalPages     : Math.ceil( total / Number(count) ),
            pageSize       : categories.length,
            totalCategories: total,
            categories
        })
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}

