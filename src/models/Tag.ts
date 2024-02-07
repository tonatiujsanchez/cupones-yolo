import mongoose, { Model, Schema } from "mongoose"
import { ITag } from "../interfaces"


export const tagSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    status: { 
        type: Boolean, 
        default: true
    }
},{
    timestamps: true
})

const Tag:Model<ITag> = mongoose.models.Tag || mongoose.model('Tag', tagSchema)

export default Tag