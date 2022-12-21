import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    created_date: {
       type: Date,
       default: Date.now 
    },
    number_of_rooms: {
        type: Number,
        default: 5
    },
    account_status: {
        type: String,
        default: 'inactive'
    }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};
