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
        unique : true,
        required: true
    },
    inStock: [{
        size: { 
            type: mongoose.Types.ObjectId,
            ref: 'Size',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    images:[{
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true
    }],
    tags:[{ 
        type: String 
    }],
    sections:[{
        type: mongoose.Types.ObjectId,
        ref: 'Section',
        required: true
    }],
    category:[{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    brands:[{
        type: mongoose.Types.ObjectId,
        ref: 'Brand',
        required: true,
    }],
    sku: {
        type: String,
        required: true,
        unique: true
    },
    discountRate: {
        type: Number,
        default: 0
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