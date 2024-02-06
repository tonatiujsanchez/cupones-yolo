import mongoose, { Model, Schema, model } from 'mongoose'
import { IType } from '@/interfaces'

const TypeSchema = new Schema<IType>({
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    } 
},{
    timestamps: true
})

const Type: Model<IType> = mongoose.models.Size || model('Type', TypeSchema)

export default Type