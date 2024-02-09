import mongoose, { Schema, model, Model } from 'mongoose'
import { ICoupon } from '@/interfaces'

const CouponSchema = new Schema<ICoupon>({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    issuedAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    expiredAt: {
        type: Date,
        required: true
    },
    exchangedAt: {
        type: Date,
        default: null
    },
    folio: {
        type: String,
        unique : true,
        required: true
    },
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        require: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true
})


CouponSchema.methods.toJSON = function(){
    const { __v, ...coupon } = this.toObject()
    return coupon
}

const Coupon: Model<ICoupon> = mongoose.models.Coupon || model('Coupon', CouponSchema)

export default Coupon