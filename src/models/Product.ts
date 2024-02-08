import mongoose, { Model, Schema, model } from 'mongoose'
import { IProduct } from '@/interfaces'

const ProductSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        required: true,
        default: 0
    },
    images:[{
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true
    }],
    sizes:[{
        type: mongoose.Types.ObjectId,
        ref: 'Size',
        required: true
    }],
    tags:[{
        type: mongoose.Types.ObjectId,
        ref: 'Tag',
        required: true
    }],
    type:[{
        type: mongoose.Types.ObjectId,
        ref: 'Type',
        required: true
    }],
    category:[{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    sku: {
        type: String,
        required: true,
        unique: true
    },
    active  : { 
        type: Boolean, 
        default: true
    },
    status  : {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const Product: Model<IProduct> = mongoose.models.Product || model('Product', ProductSchema)

export default Product