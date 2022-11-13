import mongoose from "mongoose";



export const ContactSchema = new mongoose.Schema({
    firstName: {type: String, require},
    lastName: {type: String, require},
    email: {type: String, require},
    password: {type: String, require},
    create_Date: {type: Date, default: Date.now}
})