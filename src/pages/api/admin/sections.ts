import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterQuery, isValidObjectId } from 'mongoose'
import { db } from '@/database'
import { isValidSlug } from '@/libs'
import { Section } from '@/models'
import { SECTIONS_PAGE_SIZE } from '@/constants'
import { ISection, ISectionsResp } from '@/interfaces'

type Data = 
    | { msg: string }
    | ISectionsResp
    | ISection

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch (req.method) {

        case 'GET':
            return getSections( req, res )
    
        case 'POST':
            return addNewSection( req, res )
    
        case 'PUT':
            return updateSection( req, res )
    
        case 'DELETE':
            return deleteSection( req, res )
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }

}

const addNewSection = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { title='', slug='', cover, active=true } = req.body

    title = title.trim()
    slug = slug.trim()

    if( title === '' ){
        return res.status(400).json({ msg: 'El titulo es requerido' })
    }

    if( slug === '' ){
        return res.status(400).json({ msg: 'El slug es requerido' })
    }

    if(!isValidSlug( slug )) {
        return res.status(400).json({ msg: 'El slug no es válido' })
    }

    try {
        await db.connect()
        const [ sectionByTitle, sectionBySlug ] = await Promise.all([
            Section.findOne({ title })
                .select('-createdAt -updatedAt'),
            Section.findOne({ slug })
                .select('-createdAt -updatedAt'),
        ])

        if( sectionByTitle && sectionByTitle.status ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una sección llamada "${ sectionByTitle.title }"` })
        }

        if( sectionBySlug && sectionBySlug.status ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una sección con el slug "${ sectionBySlug.slug }"` })
        }

        if( sectionByTitle && !sectionByTitle.status ){
            sectionByTitle.status = true
            
            await sectionByTitle.save()
            await db.disconnect()

            delete sectionByTitle.status

            return res.status(200).json( sectionByTitle )
        }

        if( sectionBySlug && !sectionBySlug.status ){
            sectionBySlug.status = true
            
            await sectionBySlug.save()
            await db.disconnect()

            delete sectionBySlug.status

            return res.status(200).json( sectionBySlug )
        }

        
        const newSection = new Section({
            title,
            slug,
            cover,
            active,
        })

        await newSection.save()
        await db.disconnect()

        delete newSection.createdAt
        delete newSection.updatedAt
        delete newSection.status
        
        return res.status(200).json( newSection )

    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}


const pageSize = SECTIONS_PAGE_SIZE;
const getSections = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { page = 1, count = pageSize } = req.query

    let skip = Number( page ) - 1
    let limit = Number(count)

    if( skip < 0 ){ skip = 0 }
    if( limit < 0 ){ limit = pageSize }

    skip = skip * limit


    let query:FilterQuery<ISection> = { 
        status: true
    }

    try {
        await db.connect()
        const [ sections, total ] = await Promise.all([
            Section.find( query )
                .skip(skip)
                .limit(limit)
                .sort({ registeredAt: 'desc'})
                .select('-status -createdAt -updatedAt'),
            Section.countDocuments(query)
        ])
        await db.disconnect()

        return res.status(200).json({
            currentPage  : Number(page),
            totalPages   : Math.ceil( total / Number(count) ),
            pageSize     : sections.length,
            totalSections: total,
            sections
        })
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}


const updateSection = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { _id  } = req.body

    if( !isValidObjectId(_id) ){
        return res.status(400).json({ msg: 'ID de sección no válido' })
    }

    try {
        await db.connect()
        const section = await Section.findById(_id)
        .where('status').equals(true)
        .select('-status -createdAt -updatedAt')

        if( !section ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Sección no encontrada' })
        }

        const {
            title  = section.title,
            slug   = section.slug,
            cover  = section.cover,
            active = section.active,
        } = req.body

        const sectionBySlug = await Section.findOne({ slug })

        if( sectionBySlug && sectionBySlug?._id.toString() !== section._id.toString() && !section.status){
            await db.disconnect()
            return res.status(400).json({ msg: `El slug "${ sectionBySlug.slug }" no esta disponible, hable con el administrador` })
        }


        if( sectionBySlug && sectionBySlug?._id.toString() !== section._id.toString()){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una sección con el slug "${ sectionBySlug.slug }"` })
        }


        section.title  = title 
        section.slug   = slug 
        section.cover  = cover 
        section.active = active
        
        await section.save()
        await db.disconnect()

        return res.status(200).json( section )

    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}

const deleteSection = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { idSection } = req.query

    if( !isValidObjectId(idSection) ){
        return res.status(400).json({ msg: 'ID de sección no válido' })
    }

    try {

        await db.connect()
        const section = await Section.findById(idSection)
            .where('status').equals(true)
            .select('-status -createdAt -updatedAt')

        if( !section ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Sección no encontrada' })
        }

        section.status = false
        await section.save()
        await db.disconnect()

        return res.status(200).json( section )
        
    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}