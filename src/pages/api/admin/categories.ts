import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery, isValidObjectId } from 'mongoose'
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
            
        case 'PUT':
            return updateCategory( req, res )
            
        case 'DELETE':
            return deleteCategory( req, res )
            
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const addNewCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { title='', slug='', cover, pinned=true,  active=true  } = req.body
    title = title.trim()
    slug = slug.trim()

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

        await db.connect()
        const [ categoryByTitle, categoryBySlug ] = await Promise.all([
            Category.findOne({ title })
                .select('-createdAt -updatedAt'),
            Category.findOne({ slug })
                .select('-createdAt -updatedAt'),
        ])

        if( categoryByTitle && categoryByTitle.status){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una categoría llamada "${ categoryByTitle.title }"` })
        }

        if( categoryBySlug && categoryBySlug.status){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una categoría con el slug "${ categoryBySlug.slug }"` })
        }

        if( categoryByTitle && !categoryByTitle.status ){
            categoryByTitle.status = true

            await categoryByTitle.save()
            await db.disconnect()

            delete categoryByTitle.status
            return res.status(200).json( categoryByTitle )
        }

        if( categoryBySlug && !categoryBySlug.status ){
            categoryBySlug.status = true

            await categoryBySlug.save()
            await db.disconnect()

            delete categoryBySlug.status
            
            return res.status(200).json( categoryBySlug )
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
        
        delete newCategory.createdAt
        delete newCategory.updatedAt
        delete newCategory.status
        
        return res.status(200).json( newCategory )
        
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
                .sort({ registeredAt: 'desc'})
                .select('-status -createdAt -updatedAt'),
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

const updateCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id  } = req.body

    if( !isValidObjectId(_id) ){
        return res.status(400).json({ msg: 'ID de categoria no válido' })
    }

    try {
        await db.connect()

        const category = await Category.findById(_id)
            .where('status').equals(true)
            .select('-status -createdAt -updatedAt')

        if( !category ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Categoría no encontrada' })
        }

        const {
           title  = category.title, 
           slug   = category.slug, 
           cover  = category.cover,
           pinned = category.pinned,
           active = category.active,
        } = req.body

        const categoryBySlug  = await Category.findOne({ slug })

        if(categoryBySlug && categoryBySlug._id.toString() !== category._id.toString() ){ 
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una categoría con el slug "${ categoryBySlug.slug }"` })
        }

        category.title  = title
        category.slug   = slug
        category.cover  = cover
        category.pinned = pinned
        category.active = active

        await category.save()
        await db.disconnect()

        return res.status(200).json( category )
        
    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}

const deleteCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { idCategory } = req.query

    if( !isValidObjectId(idCategory) ){
        return res.status(400).json({ msg: 'ID de categoria no válido' })
    }

    try {

        await db.connect()
        const category = await Category.findById(idCategory)
            .where('status').equals(true)
            .select('-status -createdAt -updatedAt')

        if( !category ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Categoría no encontrada' })
        }

        category.status = false
        await category.save()
        await db.disconnect()

        return res.status(200).json( category )
        
    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}

