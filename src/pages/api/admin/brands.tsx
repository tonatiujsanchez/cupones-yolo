import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Brand } from '@/models'
import { isValidSlug } from '@/libs'
import { IBrand, IBrandsResp } from '@/interfaces'

type Data = 
    | { msg: string }
    | IBrand
    | IBrandsResp

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        
        case 'POST':
            return addNewBrand( req, res )    
            
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }
}

const addNewBrand = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { title, slug, image, active=true } = req.body

    title = title.trim()
    slug = slug.trim()

    if( title === '' ){
        return res.status(400).json({ msg: 'El nombre de la marca es requerido' })
    }

    if( slug === '' ){
        return res.status(400).json({ msg: 'El slug de la marca es requerido' })
    }

    if(!isValidSlug( slug )) {
        return res.status(400).json({ msg: 'El slug no es válido' })
    }

    try {

        await db.connect()
        const [ brandByTitle, brandBySlug ] = await Promise.all([
            Brand.findOne({ title })
                .select('-createdAt -updatedAt'),
            Brand.findOne({ slug })
                .select('-createdAt -updatedAt'),
        ])

        if( brandByTitle && brandByTitle.status ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Ya existe una marca con ese nombre' })
        }

        if( brandBySlug && brandBySlug.status ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Ya existe una marca con ese slug' })
        }

        // Activar marca mediante el 'nombre' si a sido eliminada anteriormente
        if( brandByTitle && !brandByTitle.status ){
            brandByTitle.status = true

            await brandByTitle.save()
            await db.disconnect()

            delete brandByTitle.status

            return res.status(200).json(brandByTitle)
        }
        // Activar marca mediante el 'slug' si a sido eliminada anteriormente
        if( brandBySlug && !brandBySlug.status ){
            brandBySlug.status = true

            await brandBySlug.save()
            await db.disconnect()

            delete brandBySlug.status

            return res.status(200).json(brandBySlug)
        }

        const newBrand = new Brand({
            title,
            slug,
            image,
            active
        })

        await newBrand.save()
        await db.disconnect()

        delete newBrand.createdAt
        delete newBrand.updatedAt
        delete newBrand.status

        return res.status(200).json( newBrand )
        
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}
