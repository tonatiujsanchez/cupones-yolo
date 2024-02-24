import mongoose, { Model, Schema, model } from 'mongoose'
import { IProductType } from '@/interfaces'

const ProductTypeSchema = new Schema<IProductType>({
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

const ProductType: Model<IProductType> = mongoose.models.ProductType || model('ProductType', ProductTypeSchema)

export default ProductType