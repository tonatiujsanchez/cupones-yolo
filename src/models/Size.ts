import mongoose, { Model, Schema, model } from 'mongoose'
import { ISize } from '@/interfaces'

const SizeSchema = new Schema<ISize>({
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
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

const Size: Model<ISize> = mongoose.models.Size || model('Size', SizeSchema)

export default Size