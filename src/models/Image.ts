import mongoose, { Model, Schema } from 'mongoose'
import { IImage, ISectionImage } from '../interfaces'
import { IMAGES_SECTIONS, IMAGES_SECTIONS_OPTIONS } from '@/constants'


export const ImageSchema = new Schema<IImage>({
    publicId: { 
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    alt: {
        type: String
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    section: {
        type: String,
        enum: IMAGES_SECTIONS_OPTIONS,
        default: IMAGES_SECTIONS.products as ISectionImage,
        required: true,
        message: '{VALUE} no es una sección válida'
    },
    user: { 
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{
    timestamps: true,
})



const Image:Model<IImage> = mongoose.models.Image || mongoose.model('Image', ImageSchema)

export default Image