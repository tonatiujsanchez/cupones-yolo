import { Model, Schema, model, models } from 'mongoose'
import { IRoute } from '@/interfaces'


export const RouteSchema = new Schema<IRoute>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique : true,
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

const Route:Model<IRoute> = models.Route || model('Route', RouteSchema )

export default Route