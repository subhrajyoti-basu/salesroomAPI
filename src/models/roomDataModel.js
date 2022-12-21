import mongoose from "mongoose";



export const RoomDataSchema = new mongoose.Schema({
    roomName: {type: String, require},
    roomId: {type: String, require},
    roomData: {type: Array},

})