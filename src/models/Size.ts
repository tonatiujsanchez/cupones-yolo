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
    status: {
        type: Boolean,
        default: true
    }    
})

const Size: Model<ISize> = mongoose.models.Size || model('Size', SizeSchema)

export default Size