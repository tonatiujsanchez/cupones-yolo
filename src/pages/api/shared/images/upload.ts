import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File, Fields } from 'formidable'

import { v2 as cloudinary}  from 'cloudinary'
cloudinary.config( process.env.CLOUDINARY_URL || '' )

import { db } from '@/database'
import { Image } from '@/models'
import { COOKIE_AUTH_KEY, IMAGES_SECTIONS_OPTIONS } from '@/constants'
import { jwt } from '@/libs'
import { IImage, ISectionImage } from '@/interfaces'

type Data = 
    | { msg: string }
    | IImage

export const config = {
    api: {
        bodyParser: false,
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        
        case 'POST':
            return uploadImage(req, res)
    
        default:
            return res.status(400).json({ msg: 'Bad request' })
    }
}

const saveFile = async(files: File[], section:ISectionImage,  uid:string):Promise<IImage> => {

    const file = files[0]
    const user = uid

    const image = await cloudinary.uploader.upload( file.filepath, { folder: process.env.CLOUDINARY_FOLDER  } )
    const { public_id, original_filename, secure_url, bytes, format, width, height } = image
    return {
        publicId: public_id,
        filename: public_id.split('/')[1],
        originalFilename: file.originalFilename ?? original_filename,
        url : secure_url,
        title: null,
        alt: null,
        width,
        height,
        size: bytes,
        format,
        section,
        user
    }        
}

const parseFiles = (req: NextApiRequest, uid:string):Promise<IImage> => {
    return new Promise(( resolve, reject ) =>{

        const form = new IncomingForm()
        form.parse( req, async( err, fields:Fields, files )=>{

            if( err ) { 
                return reject(err)
            }

            if(!fields.section){
                return reject({ msg: 'Sección de la imagen es requerida' })
            }

            if(!IMAGES_SECTIONS_OPTIONS.includes( fields.section[0]) ){
                return reject({ msg: 'Sección de imagen NO valida' })
            }

            if(!uid){
                return reject({ msg: 'Not authorized - Usuario encontrado' })
            }

            if (!files.file) {
                return reject({ msg: 'No se encontraron archivos' });
            }

            const image = await saveFile( 
                files.file,
                fields.section[0] as ISectionImage, 
                uid
            )

           return resolve(image)
          
        })
    }) 
}


const uploadImage = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const token = req.cookies[COOKIE_AUTH_KEY]

    if(!token){
        return res.status(400).json({ msg: 'Not authorized' })
    }
    
    let uid = ''
    try {
        uid = await jwt.isValidToken( token )
    } catch (error) {
        return res.status(401).json({ msg: 'Not authorized' })
    }

    try {
        
        const image = await parseFiles( req, uid )
        const newImage = new Image(image)

        await db.connect()
        await newImage.save()
        await db.disconnect()
        
        return res.status(201).json(newImage)

    } catch (error) {

        console.log(error);
        await db.disconnect()
        return res.status(500).json({ msg: 'Hubo un error inesperado, revisar la consola del servidor' })
    }
}



