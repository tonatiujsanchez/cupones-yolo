import mongoose, { Model, Schema, model } from 'mongoose'
import { ICategory } from '@/interfaces'

const CategorySchema = new Schema<ICategory>({
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
    pinned: {
        type: Boolean,
        default: true
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

const Category: Model<ICategory> = mongoose.models.Category || model('Category', CategorySchema)

export default Category