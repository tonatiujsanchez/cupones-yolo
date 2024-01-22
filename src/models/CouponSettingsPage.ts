import { ICouponLite, ICouponSettingsPage } from "@/interfaces";
import mongoose, { Model, Schema, model } from "mongoose";

const couponLiteSchema = new Schema<ICouponLite>({
    value: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
})

const CouponSettingsPageSchema = new Schema<ICouponSettingsPage>({
    backgroundImage: {
        type: String,
        required: true,
    },
    pageTitle: {
        type: String,
        required: true,
    },
    pageSubtitle: {
        type: String,
    },
    dateToRegisterStart: {
        type: Date,
        required: true,
    },
    dateToRegisterEnd: {
        type: Date,
        required: true,
    },
    coupons: {
        type: [ couponLiteSchema ],
        required: true,
    },
    congratulationTitle: {
        type: String,
        required: true,
    },
    congratulationSubtitle: {
        type: String,
        required: true,
    },
    conditions: {
        type: String,
        required: true,
    },
    couponValidityStart: {
        type: Date,
        required: true,
    },
    couponValidityEnd: {
        type: Date,
        required: true,
    },
},{
    timestamps: true
})

const CouponSettingsPage:Model<ICouponSettingsPage> = mongoose.models.CouponSettingsPage || model('CouponSettingsPage', CouponSettingsPageSchema)

export default CouponSettingsPage