import mongoose, { Model, Schema } from 'mongoose'
import { USERS_ROLE_OPTIONS, USER_ROLES } from '@/constants'
import { IUser, IUserRol } from '../interfaces'


export const UserSchema = new Schema<IUser>({
    name    : { 
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email   : { 
        type: String,
        required: true,
        unique: true
    },
    token   : {
        type: String,
        default: null
    },
    google  : {
        type: Boolean,
        default: false
    },
    facebook: {
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
        enum: USERS_ROLE_OPTIONS,
        default: USER_ROLES.client as IUserRol,
        required: true,
        message: '{VALUE} no es un role válido',
    },
    photo   : { 
        type: String,
        default: null,
    },
    active  : { 
        type: Boolean, 
        default: true
    },
    status  : {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
})

UserSchema.pre('save', async function( next ) {

    if( this.isModified('email') ){
        this.email = this.email.toLowerCase()
    }
    
    next()
})


UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject()
    return {
        ...user, 
        uid: _id
    }
}

const User:Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;