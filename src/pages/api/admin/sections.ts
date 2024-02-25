import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { isValidSlug } from '@/libs'
import { Section } from '@/models'
import { ISection, ISectionsResp } from '@/interfaces'

type Data = 
    | { msg: string }
    | ISectionsResp
    | ISection

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
    switch (req.method) {
        case 'POST':
            return addNewSection( req, res )
    
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
            Section.findOne({ title }),
            Section.findOne({ slug })
        ])

        if( sectionByTitle ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una sección llamada "${ sectionByTitle.title }"` })
        }

        if( sectionBySlug ){
            await db.disconnect()
            return res.status(400).json({ msg: `Ya existe una sección con el slug "${ sectionBySlug.slug }"` })
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
