import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';


export const UserSchema = new Schema<IUser>({
    name    : { 
        type: String,
        required: true 
    },
    username: { 
        type: String,
        required: true 
    },
    email   : { 
        type: String,
        required: true,
        unique: true 
    },
    token   : {
        type: String
    },
    facebook: {
        type: Boolean,
        default: false
    },
    google  : {
        type: Boolean,
        default: false
    },
    x : {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    password: { 
        type: String, 
        required: true 
    },
    role    : {
        type: String,
        enum: ['admin', 'client'],
        default: 'client',
        required: true,
        message: '{VALUE} no es un role válido',
    },
    photo   : { 
        type: String,
        default: null
    },
    active  : { 
        type: Boolean, 
        default: true 
    },
    status  : {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject()
    return {
        ...user, 
        uid: _id
    }
}

const User:Model<IUser> = mongoose.models.User || mongoose.model('User',UserSchema);

export default User;