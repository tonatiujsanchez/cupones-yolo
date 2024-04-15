import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Product } from '@/models'
import { isValidSlug } from '@/libs'
import { PRODUCTS_PAGE_SIZE } from '@/constants'
import { ICategory, IImage, IProduct, IProductsResp, ISection, ISize } from '@/interfaces'
import { FilterQuery, isValidObjectId } from 'mongoose'

type Data = 
    | { msg: string }
    | IProduct
    | IProductsResp

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        
        case 'GET':
            return getProducts( req, res )
            
        case 'POST':
            return addNewProduct( req, res )
            
        case 'PUT':
            return updateProduct( req, res )
            
        case 'DELETE':
            return deleteProduct( req, res )
            

        default:
            return res.status(400).json({ msg: 'Bad Request' })
    }

}

const pageSize = PRODUCTS_PAGE_SIZE;
const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { page = 1, count = pageSize, category, sections, sizes, brand, searchTerm = '' } = req.query

    let skip = Number( page ) - 1
    let limit = Number( count )

    if( skip < 0 ){ skip = 0 }
    if( limit < 0 ){ limit = pageSize }

    skip = skip * limit

    let query:FilterQuery<IProduct> = {
        status: true
    }

    try {
        
        await db.connect()
        const [ products, total ] = await Promise.all([
            Product.find( query )
                .populate('images')
                .populate('category')
                .populate('sections')
                .populate('sizes')
                .skip( skip )
                .limit( limit )
                .sort({ registeredAt: 'desc' }),
            Product.countDocuments( query )
        ])        
        await db.disconnect()
        
        return res.status(200).json({
            currentPage  : Number(page),
            totalPages   : Math.ceil( total / Number(count) ),
            pageSize     : products.length,
            totalProducts: total,
            products,
        })
        


    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
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


const updateProduct = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    throw new Error('Function not implemented.')
}


const deleteProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { id = '' } = req.query

    if( !isValidObjectId( id ) ){
        return res.status(400).json({ msg: 'Producto no encontrado' })
    }

    try {
        
        await db.connect()
        const product = await Product.findById(id)
            .where('status').equals(true)
            .select('-status -createdAt -updatedAt')
        
        if( !product ){
            await db.disconnect()
            return res.status(400).json({ msg: 'Producto no encontrado' })
        }

        product.status = false
        await product.save()
        await db.disconnect()
        
        return res.status(200).json( product )

    } catch (error) {
        console.log(error)
        await db.disconnect()        
        return res.status(500).json({ msg: 'Error en el servidor, comuníquese con el administrador' })
    }

}
