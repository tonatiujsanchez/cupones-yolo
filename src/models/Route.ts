import { IRoute } from "@/interfaces";
import { Model, Schema, model, models } from "mongoose";


export const RouteSchema = new Schema<IRoute>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
    },
    active: { 
        type: Boolean, 
        default: true 
    },
    status: { 
        type: Boolean, 
        default: true 
    }
})

const Route:Model<IRoute> = models.Route || model('Route', RouteSchema )

export default Route