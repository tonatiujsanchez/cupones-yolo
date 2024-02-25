import mongoose, { Model, Schema, model } from 'mongoose'
import { ISection } from '@/interfaces'

const SectionSchema = new Schema<ISection>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique : true,
        required: true
    },
    cover: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    } 
},{
    timestamps: true
})

const Section: Model<ISection> = mongoose.models.Section || model('Section', SectionSchema)

export default Section