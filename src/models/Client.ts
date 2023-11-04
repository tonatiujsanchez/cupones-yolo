import mongoose, { Schema, model, Model } from 'mongoose'
import { IClient } from '../interfaces'

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    receivePromotions: {
        type: Boolean,
        default: false
    },
    registeredAt: {
        type: Date,
        required: true
    },
    coupons: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Coupon'
    }],
    couponsSent: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})


ClientSchema.methods.toJSON = function(){
    const { __v, ...client } = this.toObject()
    return client
}


const Client: Model<IClient> = mongoose.models.Client || model('Client', ClientSchema)


export default Client