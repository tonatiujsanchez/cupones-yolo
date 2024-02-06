import mongoose, { Model, Schema, model } from 'mongoose'
import { IProduct } from '@/interfaces'

const ProductSchema = new Schema<IProduct>({


})

const Product: Model<IProduct> = mongoose.models.Product || model('Product', ProductSchema)

export default Product