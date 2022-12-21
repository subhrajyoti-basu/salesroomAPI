import mongoose from "mongoose";



export const RoomSchema = new mongoose.Schema({
    roomName: {type: String, require},
    roomStatus: {type: Number, default: '1'},
    roomCreatedBy: {type: String, require},
    brandPhoto: {type:String },
    create_Date: {type: Date, default: Date.now}
})