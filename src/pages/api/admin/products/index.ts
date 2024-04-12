import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Product } from '@/models'
import { ICategory, IProduct, ISection, ISize } from '@/interfaces'
import { isValidSlug } from '@/libs'
import { IImage } from '../../../../interfaces'

type Data = 
    | { msg: string }
    | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        
        case 'POST':
            return addNewProduct( req, res )
            
        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const addNewProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let { title, description, price, slug, inStock, images=[], sizes=[], tags=[], sections=[], category=[], sku, discountRate=0, active = true } = req.body

    title       = title.trim()
    description = description.trim()
    slug        = slug.trim()
    sku         = sku.trim()

    if( title === '' ){
        return res.status(400).json({ msg: 'El nombre del producto es requerido'})
    }

    if( description === '' ){
        return res.status(400).json({ msg: 'La descripción del producto es requerida' })
    }

    if( !price ){
        return res.status(400).json({ msg: 'El precio del producto es requerido' })
    }

    if( !slug ){
        return res.status(400).json({ msg: 'El slug del producto es requerido' })
    }

    if(!isValidSlug( slug )) {
        return res.status(400).json({ msg: 'El slug no es válido' })
    }

    if( !inStock ){
        return res.status(400).json({ msg: 'El stock del producto es requerido' })
    }

    if( !inStock ){
        return res.status(400).json({ msg: 'El stock del producto es requerido' })
    }

    if( images.length < 2 ){
        return res.status(400).json({ msg: 'Se requiere al menos 2 fotos del producto' })
    }

    if( sizes.length < 1 ){
        return res.status(400).json({ msg: 'Se requiere al menos una talla del producto' })
    }

    if( sections.length < 1 ){
        return res.status(400).json({ msg: 'Se requiere al menos una sección del producto' })
    }

    if( category.length < 1 ){
        return res.status(400).json({ msg: 'La categoría del producto es requerida' })
    }

    if( sku === '' ){
        return res.status(400).json({ msg: 'El SKU del producto es requerido' })
    }

    if( discountRate < 0 ){
        discountRate = 0
    }

    if( discountRate > 100 ){
        discountRate = 100
    }

    try {
        await db.connect()

        const q = { slug: { $regex: new RegExp(slug, "i") } }
        const products = await Product
        .find(q)
        .select('title slug')
        .sort({ createdAt: 'desc' })
        .lean()

        // Validar que el slug no este repetido
        if(products.length > 0){
            const entryLast = products[0]
            const lastCaracterSlug = entryLast.slug!.substring(entryLast.slug!.length - 1, entryLast.slug!.length)
            
            if( !Number(lastCaracterSlug) ){
                slug = `${slug}-1`
            }else{
                slug = `${slug}-${ Number(lastCaracterSlug) + 1 }`
            }
        }

        // Verificar si las images, sizes, secciones, categorías se guardad solo ids
        const newProduct =  new Product({
            title, 
            description, 
            price, 
            slug, 
            inStock, 
            images: (images as IImage[]).map( img => img._id ), 
            sizes: (sizes as ISize[]).map( size => size._id ), 
            tags, 
            sections: ( sections as ISection[] ).map( section => section._id ), 
            category: ( category as ICategory[] ).map( cat => cat._id ), 
            sku, 
            discountRate, 
            active
        })

        await newProduct.save()
        await db.disconnect()  

        const product = {
            ...JSON.parse( JSON.stringify( newProduct ) ),
            images,
            sizes,
            sections,
            category,
        }
        
        return res.status(200).json(product)
        
    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }
}
