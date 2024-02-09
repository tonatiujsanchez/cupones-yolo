import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { isValidSlug } from '@/libs'
import { Category } from '@/models'
import { ICategory } from '@/interfaces'

type Data = 
    | { msg: string }
    | ICategory

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
    
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
