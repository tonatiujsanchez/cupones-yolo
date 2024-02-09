import mongoose, { Model, Schema, model } from 'mongoose'
import { IType } from '@/interfaces'

const TypeSchema = new Schema<IType>({
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

const Type: Model<IType> = mongoose.models.Type || model('Type', TypeSchema)

export default Type