import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';


export const UserSchema = new Schema({
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
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'editor'],
            message: '{VALUE} no es un role válido',
            default: 'admin',
            required: true
        }
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