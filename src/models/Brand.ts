import { Model, Schema, model, models } from 'mongoose';
import { IBrand } from '@/interfaces';

const BrandSchema = new Schema<IBrand>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique : true,
        required: true
    },
    image: {
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

const Brand: Model<IBrand> = models.Brand || model('Brand', BrandSchema)

export default Brand